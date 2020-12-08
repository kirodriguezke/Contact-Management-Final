import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext.js";

export const UpdateContact = () => {
	const { actions, store } = useContext(Context);
	const params = useParams();

	//DEFINO CADA CLAVE COMO VARIABLE CON ESTADO

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		if (params.id) {
			// PARA MEZCLAR EL UPDATECONTACT.JS CON EL ADDCONTACT.JS
			actions.getContact(params.id);
		}
		console.log("store.user.id: ", store.user.id);
		console.log("params desde Update: ", params);
	}, []);

	useEffect(() => {
		if (params.id == store.user.id) {
			setName(store.user.full_name);
			setPhone(store.user.phone);
			setEmail(store.user.email);
			setAddress(store.user.address);
		}
	}, [store.user]);

	//ONCHANGE CON CADA IMPUT PARA SETEAR VALOR CON SETX()

	const handleChangeName = event => setName(event.target.value);
	const handleChangePhone = event => setPhone(event.target.value);
	const handleChangeEmail = event => setEmail(event.target.value);
	const handleChangeAddress = event => setAddress(event.target.value);

	// CONSTRUYO UN HANDLE PARA GUARDAR CONTACTO al escribir LOS IMPUT
	const handleSaveContact = event => {
		const newContact = {
			full_name: name,
			address: address,
			phone: phone,
			email: email,
			agenda_slug: store.agenda_slug
		};

		actions.updateContact(params.id, newContact); // SE USA PARAMS PARA INDICAR EL CONTACTO QUE ESTAMOS MODIFICANDO

		alert("Tu contacto " + name + " ha sido editado");
		setName("");
		setPhone("");
		setEmail("");
		setAddress("");
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Editar un contacto ya existente</h1>
				<form>
					<div className="form-group">
						<label>Nombre Completo</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							onChange={handleChangeName}
							value={name}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							// onChange={handleChangeData}
							// value={data.email}
							onChange={handleChangeEmail}
							value={email}
						/>
					</div>
					<div className="form-group">
						<label>Teléfono</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							// onChange={handleChangeData}
							// value={data.phone}
							onChange={handleChangePhone}
							value={phone}
						/>
					</div>
					<div className="form-group">
						<label>Dirección</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							// onChange={handleChangeData}
							// value={data.address}
							onChange={handleChangeAddress}
							value={address}
						/>
					</div>
					<Link to="/">
						<button
							type="button"
							className="btn btn-primary form-control"
							onClick={handleSaveContact}
							// onClick={() => {
							// 	actions.createContact(data);
							// 	// console.log("data desde onclick", data);
							// }}
						>
							Guardar
						</button>
					</Link>
					<Link className="mt-3 w-100 text-center" to="/">
						Vuelve a tus contactos
					</Link>
				</form>
			</div>
		</div>
	);
};
