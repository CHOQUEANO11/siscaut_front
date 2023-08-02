import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col } from 'reactstrap';

   

function Modall(args) {
  const [modal, setModal] = useState(false);

  

    const [imei1, setImei1] = useState('')
    const [imei2, setImei2] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')


  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button size="sm"color="danger" onClick={toggle}>
        Excluir
      </Button>


      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Excluir {args.titulo}</ModalHeader>
        <ModalBody>
          Você tem certeza que deseja excluir este {args.Objeto}?
        </ModalBody>


        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Excluir
          </Button>{' '}
          <Button color="warning" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
}

export default Modall;