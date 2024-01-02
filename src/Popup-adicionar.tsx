import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './styles.css';
import axios from 'axios';

interface MyDialogProps {
  open: boolean;
  onClose: () => void;
  bimestre: number; // Propriedade para armazenar o valor do bimestre
}

interface Materia {
  id: number;
  nome: string;
}

const MyDialog: React.FC<MyDialogProps> = ({ open, onClose, bimestre }) => {

  const [disciplina, setDisciplina] = useState('');
  const [nota, setNota] = useState('');

  const numeroParaBimestre = (numero: number): string => {
    switch (numero) {
      case 1:
        return 'PRIMEIRO';
      case 2:
        return 'SEGUNDO';
      case 3:
        return 'TERCEIRO';
      case 4:
        return 'QUARTO';
      default:
        return ''; // Trate caso o número não esteja no intervalo esperado
    }
  };

  const handleConfirm = async () => {
    try {
      const bimestreString = numeroParaBimestre(bimestre); // Convertendo o número do bimestre para string
      const data = {
        bimestre: bimestreString,
        disciplina,
        nota,
      };
      const response = await axios.post('http://localhost:8000/api/resultados', data); // Substitua com sua URL de endpoint
      console.log(response.data); // Mensagem de confirmação do backend, se houver
      onClose(); // Fechar o diálogo após a confirmação
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
    }
  };

  const handleClickDisciplina = (disciplinaNome: string) => {
    setDisciplina(disciplinaNome);
  };
  const handleChangeNota = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNota(event.target.value);
    console.log('--------> nota', nota)
  };

  console.log(bimestre,'bimestre pai')
  const materias: Materia[] = [
    { id: 1, nome: 'Biologia' },
    { id: 2, nome: 'Artes' },
    { id: 3, nome: 'Geografia' },
    { id: 4, nome: 'Sociologia' },
  ];

  const coresDasMaterias: string[] = ['#CC4090', '#05A2C2', '#C26719', '#9B19C2']; // Cores correspondentes às matérias

  return (
    <Dialog
      open={open}
      // onClose={onClose} pode habilitar, serve para fechar o dialog sem a necessidade de clicar no X.
      PaperProps={{
        style: {
          minHeight: '50vh',
          minWidth: '40%',
          backgroundColor: '#0F0F0F',
          padding: '0% 2%',
        },
      }}
    >
      <DialogTitle className='container_title'>
        <span className='title'>Bimestre {bimestre}</span>
        <img className='image' src="/close.png" onClick={onClose} />
      </DialogTitle>
      <DialogContent >
        <div className='container_content'>
          <span className='content_title'>Disciplina</span>

          <div className='content'>
            {materias.map((materia, index) => (
              <button
                key={materia.id}
                className='content_item'
                style={{ backgroundColor: coresDasMaterias[index] }}
                onClick={() => handleClickDisciplina(materia.nome)}
              >
                {materia.nome}
              </button>
            ))}
          </div>


          {/* <div className='content'>
            {materias.map((materia, index) => (
              <div key={materia.id} className='content_item' >
                <span className='content_name'>{materia.nome}</span>
              </div>
            ))}
          </div> */}
          <span className='content_subTitle'>nota</span>
          <input
            className='content_input'
            type="text"
            inputMode="numeric"
            value={nota}
            onChange={handleChangeNota}
            placeholder="Nota"
            min="0"
            max="10"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button className='button' onClick={handleConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
