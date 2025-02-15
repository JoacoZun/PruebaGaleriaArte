import React, { useState, useEffect, useRef } from "react";
import fetchWithAuth from "../../helpers/fetchHelper";
import "./ObraForm.css"; // Asegúrate de agregar el CSS adecuado

const ObraForm = ({ onSave, obraEdit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    autor: "",
    precio: "",
  });

  const formRef = useRef(null); // Usamos un ref para movernos al formulario

  useEffect(() => {
    if (obraEdit) {
      setFormData({
        nombre: obraEdit.nombre || "",
        autor: obraEdit.autor || "",
        precio: obraEdit.precio || "",
      });
    } else {
      setFormData({ nombre: "", autor: "", precio: "" });
    }
  }, [obraEdit]);

  useEffect(() => {
    if (obraEdit && formRef.current) {
      // Desplazar al formulario cuando se edite
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [obraEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`obra-form ${obraEdit ? "edit-form" : "add-form"}`} ref={formRef}>
      <h3>{obraEdit ? "Editar Obra" : "Agregar Obra"}</h3>
      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input type="text" name="autor" placeholder="Autor" value={formData.autor} onChange={handleChange} required />
      <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
      <button type="submit">{obraEdit ? "Guardar Cambios" : "Agregar"}</button>
    </form>
  );
};

export default ObraForm;
