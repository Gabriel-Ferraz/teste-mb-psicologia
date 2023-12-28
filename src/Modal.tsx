import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './styles.css';

interface MyDialogProps {
  open: boolean;
  onClose: () => void;
}

interface Materia {
  id: number;
  nome: string;
}

const MyDialog: React.FC<MyDialogProps> = ({ open, onClose }) => {

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
        <span className='title'>Bimestre 1</span>
        <img className='image' src="/close.png" onClick={onClose} />
      </DialogTitle>
      <DialogContent >
        <div className='container_content'>
          <span className='content_title'>Disciplina</span>
          <div className='content'>
            {materias.map((materia, index) => (
              <div key={materia.id} className='content_item' style={{ backgroundColor: coresDasMaterias[index] }}>
                <span className='content_name'>{materia.nome}</span>
              </div>
            ))}
          </div>
          <span className='content_subTitle'>nota</span>
          <input
            className='content_input'
            type="text"
            inputMode="numeric"
            min="0"
            max="10"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button className='button'>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
