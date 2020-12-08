const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: [],
			//es un array. se recorre con .map()
			user: {
				full_name: null,
				phone: null,
				email: null,
				address: null
			},
			agenda_slug: "rodrike90"
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()

			createContact(data) {
				const store = getStore();
				//no hace falta getStore() porque no necesita cambiar nada del store
				console.log("data desde createContact flux", data);
				const endpoint = " https://assets.breatheco.de/apis/fake/contact/";
				const config = {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				};

				fetch(endpoint, config)
					.then(response => {
						return response.json();
					})
					.then(json => {
						console.log("JSON Response (createContact) : ", json);
						getActions().listContacts(store.agenda_slug);
						console.log("contacto guardado");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},
			getContact(id) {
				const store = getStore();
				/*el parametro :id del endpoint tiene que reemplazarse por el parametro id de la función getContact */
				const endpoint = "https://assets.breatheco.de/apis/fake/contact/" + id;
				const config = {
					method: "GET"
				};

				fetch(endpoint, config)
					.then(response => {
						return response.json();
					})
					.then(json => {
						// console.log("JSON Response: ", json);
						setStore({
							user: json
						});
						console.log("store.user desde getContact del flux: ", store.user);
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},
			updateContact(id, data) {
				const endpoint = "https://assets.breatheco.de/apis/fake/contact/" + id;
				const config = {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				};

				fetch(endpoint, config)
					.then(response => {
						return response.json();
					})
					.then(json => {
						console.log("JSON Response: ", json);
						getActions().listContacts(store.agenda_slug);
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},
			deleteContact(id) {
				const store = getStore();
				const endpoint = "https://assets.breatheco.de/apis/fake/contact/" + id;
				const config = {
					method: "DELETE"
				};

				fetch(endpoint, config)
					.then(response => {
						return response.json();
					})
					.then(json => {
						console.log("json desde deleteContact", json);
						getActions().listContacts(store.agenda_slug);
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},
			listContacts(slug) {
				const store = getStore();
				const endpoint = "https://assets.breatheco.de/apis/fake/contact/agenda/" + slug;
				const config = {
					method: "GET"
				};

				fetch(endpoint, config)
					.then(response => {
						return response.json();
					})
					.then(json => {
						console.log(
							"Desde listContacts. Estos son ahora tus contactos en la agenda (JSON Response): ",
							json,
							store.contacts
						);
						setStore({
							contacts: json
						});
						//contacts es un array donde se me almacenarán todos los objetos (contactos nuevos)
						// console.log("listContacts", store.contacts);
					})
					.catch(error => {
						console.error("Error:", error);
					});
			}
			/* Actualizar la clave contacts en mi objeto store con la respuesta a la petición listContacts */
		}
	};
};

export default getState;
