import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongID');
    const history = useHistory();

    async function handleCreateNewIncident() {

        const data = {
            title, description, value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile')
        }
        catch{
            alert('Erro ao criar Caso');
        }
    }

    return (
        <div className="newIncident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />
                    <h1>Registro Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link className="back-link " to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Casos
                    </Link>

                </section>
                <form onSubmit={handleCreateNewIncident}>
                    <input placeholder="Titulo do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <div className='button-group'>
                        <Link className="button" to="/profile">
                            Cancelar
                        </Link>
                        <button className="button" type="submit">
                            Registo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}