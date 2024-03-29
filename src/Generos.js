import React, {useState, useEffect} from 'react';
import axios from  'axios';
import {Link} from 'react-router-dom';

const Generos = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
        .get('api/genres')
        .then(res =>{
            setData(res.data.data)
        })
    },[]);

    const renderizaLinha = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteGenero(record.id)}>Excluir</button>
                    <Link className="btn btn-secondary" to={'/generos/' + record.id}>Editar</Link>
                </td>
            </tr>
        )
    }

    //Caso não exista nenhum genero cadastrado no BDS
    if(data.length === 0){
        return(
            <div className="container">
                <h1>Generos</h1>
                <Link to="/generos/novo/" className="btn btn-primary">Novo Genêro</Link>
                <div className="alert alert-info" role="alert">
                Nenhum genêro cadastrado!
                </div>
            </div>
        )
    }

    //Deletar Genero
    const deleteGenero = id =>{
        axios.delete('/api/genres/'+id)
        .then(res=>{
            const filtrado = data.filter(item => item.id !== id);
            setData(filtrado);
        })
    }

    console.log(data);

    return (
    <div className="container">
        <h1>Generos</h1>
        <Link to="/generos/novo/" className="btn btn-primary">Novo Genêro</Link>
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOME</th>
                    <th scope="col">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {data.map(renderizaLinha)}
            </tbody>
        </table>
    </div>);
}

export default Generos;