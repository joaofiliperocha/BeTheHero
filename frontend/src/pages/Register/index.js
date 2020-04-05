import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name, email, whatsapp, city, uf
        };
        console.log(data);
        try {
            const response = await api.post('ongs', data);
            alert(`O seu ID : ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert(`Erro: ${error}`);
        }


    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />
                    <h1>Registro</h1>
                    <p>Faça o seu registro, entre na plataforma e ajude pessoas a encontrar os seus casos na sua ONG.</p>

                    <Link className="back-link " to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho Registo
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsApp(e.target.value)} />
                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUF(e.target.value)} />
                    </div>
                    <button className="button" type="submit">
                        Registo
                    </button>
                </form>
            </div>
        </div>
    )

}
