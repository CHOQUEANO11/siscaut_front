/* eslint-disable no-unused-vars */
/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import {Link} from "react-router-dom";

import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
// import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import './index.css'
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {db} from '../firebase'
import { collection, onSnapshot, query,where } from 'firebase/firestore'


// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Modall from "components/ModalCautela/ModalCautela";

const Aparelho = (props) => {
  const [, setActiveNav] = useState(1);
  const [, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  




  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const [aparelhos,setAparelhos] = useState([])
  // const [renderizar ,setRenderizar] = useState(false)

  const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(aparelhos.length / itensPerPage)
  const startIndex= currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = aparelhos.slice(startIndex, endIndex)


 /*  const cautelados = query(collection(db,"Aparelhos", where ("cautelado", "==", "false") )) */

  /////////////////////////////////////////função de exibição///////////////////////////// 
  useEffect(() => {
    // Cria uma função para atualizar a lista de aparelhos com base nos dados do snapshot
    function updateAparelhos(snapshot) {
      let listaAparelhos = [];
  
      snapshot.forEach((doc) => {
        listaAparelhos.push({
          id: doc.id,
          imei1: doc.data().imei1,
          imei2: doc.data().imei2,
          marca: doc.data().marca,
          modelo: doc.data().modelo,
          cautelado: doc.data().cautelado,
        });
      });
  
      setAparelhos(listaAparelhos);
    }
  
    // Cria a consulta inicial
    const q = query(
      collection(db, 'Aparelhos'),
      where('cautelado', '==', false)
    );
  
    // Executa a consulta inicial e ouve as atualizações em tempo real
    const unsub = onSnapshot(q, (snapshot) => {
      updateAparelhos(snapshot);
    });
  
    //  função de limpeza para interromper a observação quando o componente for desmontado
    return () => unsub();
  }, []); // 

  ///////////////////////////////////// FUNÇÃO PESQUISA  ////////////////////////////////////////////////
  const [filter, setFilter] = useState([]);

  function Pesquisa(e){
   
   
   const filteredAparelhos = aparelhos.filter(aparelho =>
     aparelho.modelo.toLowerCase().includes(e.toLowerCase())
   );
   console.log(filteredAparelhos,"APARELJP")
   if (filteredAparelhos.length === 0) {
     toast.error("Nenhum Aparelho foi encontrado");
     
   } else {
     setFilter(filteredAparelhos);
   }
   if( e === ""){
    setFilter([])
  }
 }
 // ____________________________________________________________________________________________________________
  
  
  
  return (
    <>
    <ToastContainer/>
      <Header />

      

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                Chart
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                Chart
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="10">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">


                   <div className="conteinerSearch">
                    <div className="col divADICIONAR">
                      <h3 className="mb-0">Aparelhos</h3>
                      <input type="search" placeholder='Digite o modelo do aparelho' onChange={(e) => Pesquisa(e.target.value)} />
                     </div>
                    
                    
                  </div>
                  {/* <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div> */}
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr className="justificar">
                    <th scope="col">Modelo</th>
                    <th scope="col">Marcaa</th>
                    <th scope="col" className="ajeitar">IMEI</th>
                    <th scope="col" className="ajeitar">IMEI 2</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>


                {filter.length > 0 ? 
                <tbody>
                   
                   {filter.map((aparelhos) =>{
                          /* setMarca(aparelhos.modelo) */
                      
                    return(
                      <tr key={aparelhos.id}>
                        <th scope="row">{aparelhos.modelo}</th>
                        <th>{aparelhos.marca}</th>
                        <th>{aparelhos.imei1}</th>
                        <th>{aparelhos.imei2}</th>
                        <td>
                          <div>



                            <div className="OrganizarBotoes">

                              <Modall data={aparelhos} />


                            </div>


                          </div>
                        </td>
                      </tr>
                    )
                   })}


                </tbody>
                :
                <tbody>
                   
                   {currentItens.map((aparelhos) =>{
                          /* setMarca(aparelhos.modelo) */
                      
                    return(
                      <tr key={aparelhos.id}>
                        <th scope="row">{aparelhos.modelo}</th>
                        <th>{aparelhos.marca}</th>
                        <th>{aparelhos.imei1}</th>
                        <th>{aparelhos.imei2}</th>
                        <td>
                          <div>



                            <div className="OrganizarBotoes">

                              <Modall data={aparelhos} />


                            </div>


                          </div>
                        </td>
                      </tr>
                    )
                   })}


                </tbody>

}




              </Table>

              <nav aria-label="Page navigation example">
            <Pagination className="pagination justify-content-center bordaPagination"
            listClassName="justify-content-center"  >

            <PaginationItem>
    <PaginationLink
      first
      
      href="#page1"

      onClick={() => setCurrentPage(0)}
    >
      
    </PaginationLink>
  </PaginationItem>


            <PaginationItem>
                <PaginationLink
                  href={`#page${currentPage + 1}`}
                  previous
                  onClick={() => {
                    if (currentPage > 0) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                />
              </PaginationItem>

              {Array.from(Array(pages), (item, index) => {
                const pageToShow = 5; // Número de páginas a serem exibidas
                const firstPage = Math.max(0, currentPage - Math.floor(pageToShow / 2));
                const lastPage = Math.min(pages - 1, firstPage + pageToShow - 1);

                if (index >= firstPage && index <= lastPage) {
                  return (
                    <PaginationItem key={index} active={index === currentPage}>
                      <PaginationLink
                        href={`#page${currentPage + 1}`}
                        onClick={() => setCurrentPage(index)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              })}


              <PaginationItem>
                <PaginationLink
                  href={`#page${currentPage + 1}`}
                  next
                  onClick={() => {
                    if (currentPage < pages - 1) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                />
              </PaginationItem>
              <PaginationItem>
    <PaginationLink
      last
      href={`#page${pages }`}
      onClick={() => setCurrentPage(pages - 1)}
    >
      
    </PaginationLink>
  </PaginationItem>
            </Pagination>
            </nav>
              
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Aparelho;
