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
import {
  Button,
  Card,
  CardHeader,
  // CardBody,
  // NavItem,
  // NavLink,
  // Nav,
  // Progress,
  Table,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ModalExcluir from '../components/ModalExcluir/ModalExcluir'


import {db} from '../firebase'
  import {doc, collection, onSnapshot, deleteDoc} from 'firebase/firestore'


// core components
import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Modall from "components/ModalAddHt/Modal";
import ModalEditHt from "components/ModalEditHt/ModalEditHt";
import ClientesPDF from "components/RepostPdf/ClientesHt/index";

const Aparelho = (props) => {



    const [ht, setHt]= useState([])
    const [renderizar] = useState(false);

    const [, setActiveNav] = useState(1);
    const [, setChartExample1Data] = useState("data1");

    const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(ht.length / itensPerPage)
  const startIndex= currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = ht.slice(startIndex, endIndex)

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };


  //////////////////////////////////////////função de exibição////////////////////////////////////////////

useEffect(()=>{
  async function loadHt(){
    const unsub = onSnapshot(collection(db,'Ht'), (snapshot)=>{
      let listaHt = [];

      snapshot.forEach((doc)=>{
        listaHt.push({
          id: doc.id,
          marca: doc.data().marca,
          modelo: doc.data().modelo,
          nserie: doc.data().nserie,
          base: doc.data().base,
        })
      })
      setHt(listaHt);
    });

  }
    loadHt();

},[renderizar])
//////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////função excluir///////////////////////////////////
async function excluirHt(id){
  /* alert("excluiu" + id) */
  const excluDoc = doc(db, "Ht", id)
  await deleteDoc(excluDoc)
  .then(() =>{
      toast.error("O Ht foi excluido permanentemente");
      /* alert("sucesso na exclusão " + id) */
  })
  .catch((error)=>{
    toast.error('Algo deu errado, tente novamente mais tarde')

  });
}
///////////////////////////////////////////////////////////////////////////////////////

////////////////PESQUISA/////////////////////////////
const [filter, setFilter] = useState([]);

function Pesquisa(e){
 
 
 const filteredHts = ht.filter(hts =>
   hts.nserie.toLowerCase().includes(e.toLowerCase())
 );
 console.log(filteredHts,"HT")
 if (filteredHts.length === 0) {
   toast.error("Nenhum Ht foi encontrado");
   
 } else {
   setFilter(filteredHts);
 }
 if( e === ""){
  setFilter([])
}
}

/////////////////////////////

  return (
    <>
    <ToastContainer/>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">

                <div className="conteinerSearch">
                  <div className="col divADICIONAR">
                    <h3 className="mb-0">HT</h3>
                    <input type="search" placeholder='Pesquisa por Imei' onChange={(e) => Pesquisa(e.target.value)} />
                  </div>

                  <div className="divADICIONAR btn" style={{justifyContent : "space-between"}}> 
                    <Modall/>
                    {/* <Button color="danger" onClick={(e) => ClientesPDF(ht)}><i class="far fa-file-pdf"></i> Gerar PDF</Button>{' '} */}
                  </div>
                  </div>
            
                </Row>
              </CardHeader>


              <Table className="align-items-center table-flush" responsive>
                
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Número de série </th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Base</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                {filter.length > 0 ?
                <tbody>
                  {filter.map((hts)=>{
                    return(
                      
                      <tr key={hts.id}>

                        <th scope="row">{hts.nserie}</th>
                        <th scope="row">{hts.marca}</th>
                        <th scope="row">{hts.modelo}</th>
                        <th scope="row">{hts.base}</th>
                        <td>

                          <div> 
              
                            <div className="OrganizarBotoes">
                              {<ModalEditHt data= {hts}/>}
                            {/* <ModalEditChip data= {chips}/> */}
                          
                              <ModalExcluir 
                              title='Ht'
                              func={() => excluirHt(hts.id)} />
                            </div>


                          </div>
                        </td>
                      </tr>
                      

                    )
                  })}
                </tbody>
:
                <tbody>
                  {currentItens.map((hts)=>{
                    return(
                      
                      <tr key={hts.id}>

                        <th scope="row">{hts.nserie}</th>
                        <th scope="row">{hts.marca}</th>
                        <th scope="row">{hts.modelo}</th>
                        <th scope="row">{hts.base}</th>
                        <td>

                          <div> 
              
                            <div className="OrganizarBotoes">
                              {<ModalEditHt data= {hts}/>}
                            {/* <ModalEditChip data= {chips}/> */}
                          
                              <ModalExcluir 
                              title='Ht'
                              func={() => excluirHt(hts.id)} />
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
          
        </Row>
      </Container>
    </>
  );
};

export default Aparelho;
