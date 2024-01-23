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
import { Link } from "react-router-dom";


import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)

// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts

// reactstrap components
import "./index.css";
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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalExcluir from "../components/ModalExcluir/ModalExcluir";

//firebase functions
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

//componentes
import Header from "components/Headers/Header.js";
import ModalInfDescaut from "components/ModalInfDescaut/ModalInDescaut";

const AparelhosCautelados = (props) => {
  /* const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1"); */

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  /* const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
 */
  const [aparelhos, setAparelhos] = useState([]);
   const [renderizar, setRenderizar] = useState(false);


  const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(aparelhos.length / itensPerPage)
  const startIndex= currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = aparelhos.slice(startIndex, endIndex)

  

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
        });
      });

      setAparelhos(listaAparelhos);
    }

    // Cria a consulta inicial
    const q = query(
      collection(db, "Aparelhos"),
      where("cautelado", "==", true)
    );

    // Executa a consulta inicial e ouve as atualizações em tempo real
    const unsub = onSnapshot(q, (snapshot) => {
      updateAparelhos(snapshot);
    });

    //  função de limpeza para interromper a observação quando o componente for desmontado
    return () => unsub();
  }, [renderizar]); 
  /////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////função excluir///////////////////////////////////
  async function desfazerCautela(id) {
 

 const q = query(
  collection(db, "Cautelas"),
  where("aparelho", "==", id),
);
const data = await getDocs(q);

const response = data.docs.map((doc) => {  
  const idcaut = doc.id 
  const idChip = doc.data().chip;
  return { idcaut, idChip };
  
});


const excluDocCaut = doc(db, "Cautelas", response[0].idcaut)

const docAparelho = doc(db, 'Aparelhos', id);
const docChip = doc(db, 'Chip', response[0].idChip);

try{
await deleteDoc(excluDocCaut)

await updateDoc(docAparelho, {
  cautelado: false,
});

await updateDoc(docChip, {
  cautelado: false,
});

toast.error("Cautela excluída");
    
setRenderizar(!renderizar)
setFilter([])

    }catch(error){
      toast.error("Algo deu errado, tente novamente mais tarde");
      console.log(error)
    }

  }
  ///////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////// FUNÇÃO PESQUISA  ////////////////////////////////////////////////
const [filter, setFilter] = useState([]);

function Pesquisa(e){
    
    
  const filteredAparelhos = aparelhos.filter(aparelho =>
    aparelho.imei1.toLowerCase().includes(e.toLowerCase())
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
      <ToastContainer />
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row></Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="10">
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="conteinerSearch">
                    <div className="col divADICIONAR">
                      <h3 className="mb-0">Aparelhos Cautelados</h3>
                      <input type="search" placeholder='Pesquisa por imei' onChange={(e) => Pesquisa(e.target.value)} />
                     </div>
    
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr className="justificar">
                    <th scope="col">Modelo</th>
                    <th scope="col">Marcaa</th>
                    <th scope="col" className="ajeitar">
                      IMEI
                    </th>
                    <th scope="col" className="ajeitar">
                      IMEI 2
                    </th>
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
                              <ModalInfDescaut data={aparelhos} />
                              <ModalExcluir func={() => desfazerCautela(aparelhos.id)} />
                              
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                   })}


                </tbody>
                :

                <tbody>
                 

                  {currentItens.map((aparelhos) => {
                    /* setMarca(aparelhos.modelo) */

                    return (
                      <tr key={aparelhos.id}>
                        <th scope="row">{aparelhos.modelo}</th>
                        <th>{aparelhos.marca}</th>
                        <th>{aparelhos.imei1}</th>
                        <th>{aparelhos.imei2}</th>
                        <td>
                          <div>
                            <div className="OrganizarBotoes">
                              <ModalInfDescaut data={aparelhos} />
                              <ModalExcluir func={() => desfazerCautela(aparelhos.id)} />
                              
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
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

export default AparelhosCautelados;
