import React,{useState} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../Services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [value, setvalue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data,{
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }


    return (
        <div className="new-incident-conteiner">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Profile
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea  
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setdescription(e.target.value)}
                    />
  
                  <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setvalue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}