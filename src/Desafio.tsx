import React, { useState } from 'react';
import './Desafio.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MyDialog from './Modal';
import PopupDelete from './Modal-remove';

interface Materia {
  id: number;
  nome: string;
  data: string;
}

interface Bimestre {
  id: number;
  materias: Materia[];
}

const bimestres: Bimestre[] = [
  {
    id: 1,
    materias: [
      { id: 1, nome: 'Biologia', data: '28/04/2022' },
      { id: 2, nome: 'Artes', data: '28/04/2022' },
      { id: 3, nome: 'Geografia', data: '28/04/2022' },
      { id: 4, nome: 'Sociologia', data: '28/04/2022' }
    ]
  },
  {
    id: 2,
    materias: [
      { id: 1, nome: 'Biologia', data: '28/04/2022' },
      { id: 2, nome: 'Artes', data: '28/04/2022' },
      { id: 3, nome: 'Geografia', data: '28/04/2022' },
      { id: 4, nome: 'Sociologia', data: '28/04/2022' }
    ]
  },
  {
    id: 3,
    materias: [
      { id: 1, nome: 'Biologia', data: '28/04/2022' },
      { id: 2, nome: 'Artes', data: '28/04/2022' },
      { id: 3, nome: 'Geografia', data: '28/04/2022' },
      { id: 4, nome: 'Sociologia', data: '28/04/2022' }
    ]
  },
  
  {
    id: 4,
    materias: [
      { id: 1, nome: 'Biologia', data: '28/04/2022' },
      { id: 2, nome: 'Artes', data: '28/04/2022' },
      { id: 3, nome: 'Geografia', data: '28/04/2022' },
      { id: 4, nome: 'Sociologia', data: '28/04/2022' }
    ]
  },
  
];

const coresDasMaterias: string[] = ['#CC4090', '#05A2C2', '#C26719', '#9B19C2']; // Exemplo de cores para as matérias


function Desafio() {

  const [open, setOpen] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setIsDelete(true);
  };
  
  const handleDeleteClose = () => {
    setIsDelete(false);
  };

  return (
    <div className="desafio_Container">
      {bimestres.map((bimestre) => (
        <div className="desafio_Content" key={bimestre.id}>
          <div className="desafio_title_button">
            <span className='desafio_title'>Bimestre {bimestre.id}</span>
            <button className='desafio_button_container' onClick={handleOpen}> Lançar nota <img src="/add.png" className='desafio_button_image' alt="Adicionar" /></button>
           
          </div>
          <div className="desafio_card_container">
            {bimestre.materias.map((materia, index) => (
              <div className="desafio_card_content">
                <div key={materia.id} className="desafio_card" style={{ backgroundColor: coresDasMaterias[index % coresDasMaterias.length] }}>
                  <h3 className='desafio_card_title'>{materia.nome}</h3>
                  <p className='desafio_card_data'>{materia.data}</p>
                  <div className='desafio_card_nota'>
                    <img src="/low_score.png"/>
                    <span className='desafio_card_nota_text'>Nota: 5</span>
                  </div> 
                </div>
                <img className="desafio_remove" src="/remove.png" alt="Remover"  onClick={handleDelete}/>
              </div>
            ))}
          </div>
          
        </div>
      ))}
       <MyDialog open={open} onClose={handleClose} />
       <PopupDelete open={isDelete} onClose={handleDeleteClose}/>
    </div>
    
  );
}

// OBSERVAÇÃO REVER NOMES EM INGLES PARA PORTUGUÊS!!!!!!!!

export default Desafio;