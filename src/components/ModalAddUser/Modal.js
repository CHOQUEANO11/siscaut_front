import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
  Spinner,
} from "reactstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { query, where, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function ModalAddMilitar(args) {
  //controle do modal
  const [modal, setModal] = useState(false);

  // states para validação
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [validRg, setValidRg] = useState(false);

  //states para pegar os valores dos inputs
  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [rg, setRg] = useState("");
  const [unidade, setUnidade] = useState("");
  const [postgrad, setPostgrad] = useState("");

  //State para loading
  const [loadingAdd, setLoadingAdd] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setEmptyevalue(false);
    setValidRg(false);
    setNome("");
    setFuncao("");
    setUnidade("");
    setPostgrad("");
    setRg("");
  };

  //para exibir as unidades
  const [unidades, setUnidades] = useState([])


  ///////////////////////////////////////////////Função de exibição das unidades/////////////////////

  useEffect(() => {
    async function loadUnidades() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Unidades'));
  
        const listaUnidades = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          unidade: doc.data().unidade,
        }));
  
        setUnidades(listaUnidades);
      } catch (error) {
        // Trate erros aqui
        console.error("Ocorreu um erro:", error);
      }
    }
    loadUnidades();
  }, []);
  

  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////função handleAdd/////////////////////////////////////

  async function handleAdd() {
    setLoadingAdd(true);
    try {

      //criação da query/consulta para verificar se o rg digitado existe no banco
      const q = query(collection(db, "Militares"), where("rg", "==", rg));

      //execução da query/consulta
      const querySnapshot = await getDocs(q);

      //pegando os resultados encontrados
      const resultado = querySnapshot.docs;

      if (!nome || !funcao || !rg || !unidade || !postgrad) {
        setEmptyevalue(true);
      } else {
        if (rg.length < 3) {
          setValidRg(true);
        } else {
          if (resultado.length > 0) {
            toast.error("Este militar com este Rg já foi adicionado", {
              position: "bottom-center",
            });
            
          } else {
            await addDoc(collection(db, "Militares"), {
              nome: nome,
              funcao: funcao,
              rg: rg,
              unidade: unidade,
              
              postgrad: postgrad,
            });

            toast.success("Militar adicionado com sucesso");
            setNome("");
            setFuncao("");
            setUnidade("");
            setPostgrad("");
            setRg("");
            toggle();
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu algum erro, tente novamente mais tarde");
    } finally {
      setLoadingAdd(false);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Button size="sm" color="success" onClick={toggle}>
        Adicionar
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Adicionar militar</ModalHeader>
        <ModalBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">
              Informações do militar
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Nome
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder="Nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />

                    {emptyevalue && nome === "" ? (

                      <Alert color="danger">Coloque o nome</Alert>) : ("")}

                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-email">
                      RG
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder="00000"
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 10);
                        setRg(e.target.value);
                      }}
                      type="text"
                      value={rg}
                      onChange={(e) => setRg(e.target.value)}
                    />

                    {emptyevalue && rg === "" ? (<Alert color="danger">Coloque o rg</Alert>) : ("")}

                    {validRg && rg.length < 3 && rg.length > 0 ? (<Alert color="danger"> RG inválido, números insuficientes.</Alert>) : ("")}

                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-first-name"
                    >
                      Posto/Grad
                    </label>

                    <Input
                      type="select"
                      name="select"
                      id="SelectMarca"
                      value={postgrad}
                      onChange={(e) => setPostgrad(e.target.value)}
                    >
                      <option value="">Escolha</option>
                      <option value="Volutário Civil">Volutário Civil</option>
                      <option value="Soldado">Soldado</option>
                      <option value="Cabo">Cabo</option>
                      <option value="3º Sargento">3ª Sargento</option>
                      <option value="2º Sargento">2ª Sargento</option>
                      <option value="1º Sargento">1ª Sargento</option>
                      <option value="Sub Tenente">Sub Tenente</option>
                      <option value="2º tenente">2º tenente</option>
                      <option value="1º tenente">1º tenente</option>
                      <option value="Capitão">Capitão</option>
                      <option value="Major">Major</option>
                      <option value="Tenente Coronel">Tenente Coronel</option>
                      <option value="Coronel">Coronel</option>
                    </Input>

                    {emptyevalue && postgrad === "" ? (
                      <Alert color="danger">Coloque o Posto/Grad</Alert>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Unidade
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-last-name"
                      placeholder="Unidade"
                      type="select"
                      value={unidade}
                      onChange={(e) => setUnidade(e.target.value)}
                    >
                      <option  value="" disabled  >
                                                    escolha
                                                </option>
                                                {unidades.map((unidade)=>{
                              return(
                                <option key={unidade.id} value={unidade.unidade}>{unidade.unidade}</option>
                              )
                            })}
                    </Input>

                    {emptyevalue && unidade === "" ? (
                      <Alert color="danger">Coloque a unidade</Alert>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Função
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-last-name"
                      placeholder="Função"
                      type="text"
                      value={funcao}
                      onChange={(e) => setFuncao(e.target.value)}
                    />

                  {emptyevalue && funcao === "" ? (<Alert color="danger">Coloque a função</Alert> ):("")}

                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={handleAdd}>
          {loadingAdd ? (<><Spinner size="sm" color="primary"></Spinner>{" "}<span>Salvando</span></>) :
            (
              "Salvar"
            )}
          </Button>
          <Button color="warning" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalAddMilitar;
