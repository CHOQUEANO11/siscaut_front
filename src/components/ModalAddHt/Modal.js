import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  Label, 
  CustomInput} from 'reactstrap';

   

function Modall(args) {
  const [modal, setModal] = useState(false);

  

    const [nserie, setNserie] = useState('')
    const [base, setbase] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')


  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button size="sm"color="success" onClick={toggle}>
        Adicionar
      </Button> 
          

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Adicionar</ModalHeader>
        <ModalBody>
          
          
        <CardBody>
                <Form>

                  <h6 className="heading-small text-muted mb-4">
                    Informações HT
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-NserieHT"
                          >
                            Nº de Série
                          </label>
                          <Input
                            className="form-control-alternative"
                            /* defaultValue="lucky.jesse" */
                            id="input-ModeloHt"
                            placeholder="Nº de serie"
                            type="text"
                            value={nserie}
                            onChange={(e)=> setNserie (e.target.value)}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        {/* <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="Marca-Ht"
                          >
                            Marca
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="Marca-Ht"
                            placeholder="Marca"
                            type="text"
                            value={marca}
                            onChange={(e)=> setMarca (e.target.value)}
                          />


                        </FormGroup> */}
                        <FormGroup>
                          <Label for="exampleSelect">Marca</Label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option selected>Escolha</option>
                            <option>Marca 1</option>
                            <option>Marca 2</option>
                            <option>Marca 3</option>
                            <option>Marca 4</option>
                            <option>Marca 5</option>
                          </Input>
                      </FormGroup>




                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Modelo
                          </label>
                          <Input
                            className="form-control-alternative"
                            /* defaultValue="Lucky" */
                            id="input-first-name"
                            placeholder="Modelo"
                            type="text"
                            value={modelo}
                            onChange={(e)=> setModelo (e.target.value)}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        
                        {/* <FormGroup check inline>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Possui Base ?
                          </label>
                      
                        </FormGroup> */}
                        {/* CheckBox selecionando apenas um */}
                         <FormGroup>
                            <Label for="exampleCheckbox">Possuí base ?</Label>
                          </FormGroup>
                          <FormGroup></FormGroup>




                        <div className="pl-lg-4">
                        {/* <Row>
                          <Col lg="6">
                          <Input style={{marginLeft: 8}} type="checkbox" />
                              <Label style={{marginLeft: 30}} check> SIM</Label>
                            </Col>
                            <Col lg="3">
                            <Input style={{marginLeft: 5}} type="checkbox" />
                              <Label style={{marginLeft: 25}} check>
                              NÃO
                              </Label>
                            </Col>
                            </Row> */}
                            <Row>

                            <Col lg="6">

                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="SIM" />
                            </Col>
                            <Col lg="3">

                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="NÃO" />
                            </Col>
                            </Row>
                            


                            </div>
                      </Col>
                    </Row>
                    <Row>
                    </Row>
                  </div>
                  
                </Form>
              </CardBody>
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