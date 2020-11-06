const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contactos: []
		},
		actions: {
			createContact(data) {
				const store = getStore();
				const endpoint = "https://assets.breatheco.de/apis/fake/contact/";
				const config = {
					method: "POST",

					body: JSON.stringify({
						full_name: data.full_name,
						email: data.email,
						agenda_slug: "rodrike90",
						address: data.address,
						phone: data.phone
					}),
					headers: {
						"Content-Type": "application/json"
					}
				};
				fetch(endpoint, config)
					.then(response => {
						return response.json();
					})
					.then(json => {
						return json;
					});
			},
			getContact(id) {
				const store = getStore();
				const endpoint = "https://assets.breatheco.de/apis/fake/contact/:id";
				const config = {
					method: "GET"
				};
				fetch(endpoint, config)
					.then(response => {
						return response.json();
					})
					.then(json => {
						getActions().listContacts("rodrike90");
					});
			},

			getContact(id) {
				const store = getStore();
				const endpoint = "https://assets.breatheco.de/apis/fake/contact/:id";
				const config = {
					method: "DELETE"
				};
				fetch(endpoint, config)
					.then(response => {
						return response.json();
					})
					.then(json => {
						return json;
					});
			},

			updateContact(id, data) {
				const store = getStore();
				const endpoint = "https://assets.breatheco.de/apis/fake/contact/:id";
				const config = {
					method: "PUT",

					body: JSON.stringify({
						full_name: data.full_name,
						email: data.email,
						agenda_slug: "rodrike90",
						address: data.address,
						phone: data.phone
					}),
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
						setStore({ contactos: json });
					});
			}
		}
	};
};

export default getState;
