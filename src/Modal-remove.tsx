import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './styles.css';

interface PopupDeleteProps {
  open: boolean;
  onClose: () => void;
}

const PopupDelete: React.FC<PopupDeleteProps> = ({ open, onClose }) => {

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
        <span className='title'>Atenção!</span>
        <img className='image' src="/close.png" onClick={onClose} />
      </DialogTitle>
      <DialogContent >
        <div className='container_content'>
          <span className='content_title'>Disciplina</span>
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

export default PopupDelete;
