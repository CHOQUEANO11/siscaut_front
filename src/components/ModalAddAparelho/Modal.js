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
      <Button size="sm"color="success" onClick={toggle}>
        Adicionar
      </Button>


      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Adicionar Aparelho</ModalHeader>
        <ModalBody>
          
          
        <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informações do Aparelho
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      

                    <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Modelo
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Modelo"
                            type="text"
                            value={modelo}
                            onChange={(e)=> setModelo (e.target.value)}
                          />
                        </FormGroup>
                      </Col>



                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Marca 
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Marca"
                            type="text"
                            value={marca}
                            onChange={(e)=> setMarca (e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            1º IMEI
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="IMEI"
                            type="text"
                            value={imei1}
                            onChange={(e)=> setImei1 (e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            2º IMEI
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="IMEI"
                            type="text"
                            value={imei2}
                            onChange={(e)=> setImei2 (e.target.value)}

                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    
                      
                    </Row>
                  </div>
              
                  {/* Address */}
                  
                </Form>
        </ModalBody>


        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Adicionar
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