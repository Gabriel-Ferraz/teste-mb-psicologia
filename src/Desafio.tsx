import React, { useState, useEffect } from 'react';
import './Desafio.css';
import MyDialog from './Popup-adicionar';
import PopupDelete from './Popup-remove';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

interface Materia {
  id: number;
  nome: string;
  data: string;
}

interface Bimestre {
  id: number;
}

const bimestres: Bimestre[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },

];

const coresDasMaterias: string[] = ['#CC4090', '#05A2C2', '#C26719', '#9B19C2']; // Exemplo de cores para as matérias



function Desafio() {

  const [open, setOpen] = React.useState(false);
  const [selectedBimestre, setSelectedBimestre] = useState<number>(0); // Estado para armazenar o bimestre selecionado
  const [resultados, setResultados] = useState<Materia[]>([]); // Estado para armazenar os dados do backend

  const [isDelete, setIsDelete] = React.useState(false);


  useEffect(() => {
    axios.get('http://localhost:8000/api/resultados')
      .then(response => {
        console.log('Dados recebidos do backend:', response.data.resultados);
        setResultados(response.data.resultados);
      })
      .catch(error => {
        console.error('Erro ao obter os resultados:', error);
        // Trate os erros adequadamente
      });
  }, []); // Executa somente uma vez após a montagem do componente

  const handleOpen = (bimestreId: number) => {
    setSelectedBimestre(bimestreId); // Atualiza o bimestre selecionado
    console.log(selectedBimestre, '---------> numero bimestre')
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
            <Tooltip title="Adicionar nota">
              <button className='desafio_button_container' onClick={() => handleOpen(bimestre.id)}>
                Lançar nota <img src="/add.png" className='desafio_button_image' alt="Adicionar" />
              </button>
            </Tooltip>
            {/* <button className='desafio_button_container' onClick={handleOpen}> Lançar nota <img src="/add.png" className='desafio_button_image' alt="Adicionar" /></button> */}

          </div>
          <div className="desafio_card_container">
            {resultados.map((materia, index) => (
              <div className="desafio_card_content" key={materia.id}>
                <div className="desafio_card" style={{ backgroundColor: coresDasMaterias[index % coresDasMaterias.length] }}>
                  <h3 className='desafio_card_title'>{materia.nome}</h3>
                  <p className='desafio_card_data'>{materia.data}</p>
                  <div className='desafio_card_nota'>
                    <img src="/low_score.png" alt="Nota" />
                    {/* <span className='desafio_card_nota_text'>Nota: {materia.nota}</span> */}
                  </div> 
                </div>
                <Tooltip title="Remover">
                  <img className="desafio_remove" src="/remove.png" alt="Remover" onClick={handleDelete} />
                </Tooltip>
              </div>
            ))}
          </div>
          {/* <div className="desafio_card_container">
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
                <Tooltip title="Remover">
                  <img className="desafio_remove" src="/remove.png" alt="Remover" onClick={handleDelete} />
                </Tooltip>
              </div>
            ))}
          </div> */}

        </div>
      ))}
      <MyDialog open={open} onClose={handleClose} bimestre={selectedBimestre} />
      <PopupDelete open={isDelete} onClose={handleDeleteClose} />
    </div>

  );
}

// OBSERVAÇÃO REVER NOMES EM INGLES PARA PORTUGUÊS!!!!!!!!

export default Desafio;