import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            console.log(res.data);
            setIncidents(res.data);
        })
    }, [ongId])

    function handleDeleteIncident(id) {
        try {
            api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (error) {
            alert('Erro ao apagar Caso')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className='button' to='/incidents/new'>
                    Registar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Registados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRICAO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}