// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   FormGroup,
//   Form,
//   Input,
//   Row,
//   Col,
//   Spinner,
//   Alert,
// } from "reactstrap";
// import "./ModalDescaut.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   doc,
//   collection,
//   query,
//   where,
//   getDoc,
//   getDocs,
//   updateDoc,
//   addDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import ClientesPDF from "components/RepostPdf/pdfAparelhosCaut/";
// import UsuarioPDF from "components/RepostPdf/pdfAparelhosCaut/index"

// function Modall(props) {
//   const [modal, setModal] = useState(false);
//   const [idChip, setIdChip] = useState("");
//   const [nunChip, setNunChip] = useState("");
//   const [idMilitar, setIdMilitar] = useState("");
//   const [nomeMilitar, setNomeMilitar] = useState("");
//   const [fiscais, setFiscais] = useState([]);
//   const [nomeFiscal, setNomeFiscal] = useState("");
//   const [listaAparelhos, setListaAparelhos] = useState(props.data);
//   const [loading,setLoading] = useState(false)
//   const [aparelhos, setAparelhos]= useState([])

//   const [emptyevalue,setEmptyevalue] = useState(false)

//   const toggle = () => {
//     setModal(!modal);
//   };

//   ///////////////////////////////////////Pegar Número do Chip Cautelado/////////////////////////////////

//   useEffect(() => {
//     async function chipCautelado() {
//       try {
//         const q = query(
//           collection(db, "Cautelas"),
//           where("aparelho", "==", props.data.id)
//         );

//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//           // Para cada documento retornado pela consulta

//           const valorDoCampo = doc.data().chip; // 'chip' é o nome do campo que você deseja recuperar
//           setIdChip(valorDoCampo);
//         });

//         // Após definir idChip, você pode chamar getNumero() aqui

//         if (idChip) {
//           getNumero();
//         }
//       } catch (error) {
//         console.error("Erro ao consultar documento:", error);
//       }
//     }
//     chipCautelado();
//   }, [modal]);

//   async function getNumero() {
//     try {
//       const docRef = doc(db, "Chip", idChip);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         // O documento existe
//         const numero = docSnap.data().numero;
//         setNunChip(numero);
//       } else {
//         // O documento não existe
//         console.log("O documento não foi encontrado.");
//       }
//     } catch (error) {
//       // Trate erros aqui
//       console.error("Erro ao obter o número:", error);
//     }
//   }
//   /////////////////////////////////////////////////////////////////////////////////



//    ///////////////////////////////// -Fiscais- /////////////////////////////////////
//    useEffect(()=>{
//     async function loadFiscais(){
//       try {
//         const querySnapshot = await getDocs(collection(db, 'fiscais_contrato'));
  
//         let listaFiscais = [];
//         querySnapshot.forEach((doc) => {
//           listaFiscais.push({
//             id: doc.id,
//             nome: doc.data().nome,
//           });
//         });
  
//         setFiscais(listaFiscais);
//       } catch (error) {
//         // Trate erros aqui
//         console.error("Ocorreu um erro:", error);
//       }
//     }
//     loadFiscais();
  
//   },[])

//   ///////////////////////////////////////////////////////////////







//   ///////////////////////////////////////////Pegar o nome do Militar//////////////////////////////

//   useEffect(() => {
//     async function NomeMilitar() {
//       try {
//         const q = query(
//           collection(db, "Cautelas"),
//           where("aparelho", "==", props.data.id)
//         );

//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//           // Para cada documento retornado pela consulta

//           const valorDoCampo = doc.data().militar; // 'militar' é o nome do campo que você deseja recuperar
//           setIdMilitar(valorDoCampo);
//         });

//         // Após definir idMilitar, você pode chamar getNumero() aqui

//         if (idMilitar) {
//           getNomeMilitar();
//         }
//       } catch (error) {
//         console.error("Erro ao consultar documento:", error);
//       }
//     }
//     NomeMilitar();
//   }, [modal]);

//   async function getNomeMilitar() {
//     try {
//       const docRef = doc(db, "Militares", idMilitar);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         // O documento existe
//         const nome = docSnap.data().nome;
//         setNomeMilitar(nome);
//       } else {
//         // O documento não existe
//         console.log("O documento não foi encontrado.");
//       }
//     } catch (error) {
//       // Trate erros aqui
//       console.error("Erro ao obter o nome:", error);
//     }
//   }

//   //////////////////////////////////////////////////////////////////////////////////////////////////

//   ///////////////////////////////////FUNÇÃO DE DESCAUTELA//////////////////////////////////////////

//   async function HandleDescautelar() {
//     setLoading(true)


//     const dataAtual = new Date();
//     const docAparelho = doc(db, "Aparelhos", props.data.id);
//     const docChip = doc(db, "Chip", idChip);
//     const docMilitar = doc(db, "Militares", idMilitar);

   

//     ////////////////////////////////////Para fazer o update/////////////////////////////////
//     const q = query(
//       collection(db, "Cautelas"),
//       where("aparelho", "==", props.data.id)
//     );

//     const querySnapshot = await getDocs(q);

//     // Array para armazenar os dados que vão ser atualizados
//     let dadosParaUpdate = [];

//     querySnapshot.forEach((doc) => {
//       // Obter os dados do documento
//       const data = doc.data();

//       // Adiciona os dados ao array
//       dadosParaUpdate.push({
//         id: doc.id, // ID do documento
//         dados: data, // Dados do documento
//         date_caut: doc.data().date_caut // pega o date_caut
//       });
//     });
//     let datacautela;
//     let DocRefCaut
//     ////////////////////////////////////////////////////////////////////

//     const [docSnapChip, docSnapMilitar, docSnapAparelho] = await Promise.all([
//       getDoc(docChip),
//       getDoc(docMilitar),
//       getDoc(docAparelho)
//     ]);
//     try {
//       if(nomeFiscal===""){
        
//         setEmptyevalue(true)
//       }else{
//       dadosParaUpdate.forEach(async (documento) => {
//         const { id, dados, date_caut } = documento; // Desestrutura o objeto para obter o ID e os dados

//         // Faz o updateDoc aqui usando os dados e o ID do documento
//         const docRef = doc(db, "Cautelas", id);
//         /* await updateDoc(docRef, {
//           cautela: false,
//         }); */
//         datacautela = date_caut;
//         DocRefCaut = docRef
//       });

//       await updateDoc(docAparelho, {
//         cautelado: false,
//       });

//       await updateDoc(docChip, {
//         cautelado: false,
//       });

//       await addDoc(collection(db, "Devolucoes_aparelhos"), {
//         numero: docSnapChip.data().numero,
//         linha: docSnapChip.data().linha,
//         nserie: docSnapChip.data().nserie,
//         funcao: docSnapMilitar.data().funcao,
//         nome: docSnapMilitar.data().nome,
//         postgrad: docSnapMilitar.data().postgrad,
//         rg: docSnapMilitar.data().rg,
//         unidade: docSnapMilitar.data().unidade,
//         imei1: docSnapAparelho.data().imei1,
//         imei2: docSnapAparelho.data().imei2,
//         marca: docSnapAparelho.data().marca,
//         modelo: docSnapAparelho.data().modelo,
//         fiscal_devolu: nomeFiscal,
//         date_devolu: dataAtual.toISOString(),
//         date_caut: datacautela,
//       });

//       await deleteDoc(DocRefCaut)

//       toast.success("O aparelho foi descautelado ");
//       toggle();
//       //
//     }
//     } catch (error) {
//       // erros
//       toast.error("occoreu um erro", error)
//       console.error("Ocorreu um erro:", error);
//     }finally {
//       setLoading(false)
      
      
//     }
  
//   }

//   ////////////////////////////////////////////////////////////////////////////

//   return (
//     <div>
//       <Button size="sm" color="success" onClick={toggle}>
//         <i className="fa-solid fa-circle-info"></i>
//       </Button>

//       <Modal isOpen={modal} toggle={toggle} {...props}>
//         <ModalHeader toggle={toggle}>Informações</ModalHeader>
//         <ModalBody>
//           <Form>
//             <h6 className="heading-small text-muted mb-4">
//               Descautela de Aparelho
//             </h6>
//             <div className="pl-lg-1">
//               <Row>
//                 <Col lg="10">
//                   <FormGroup>
//                     <label
//                       className="form-control-label"
//                       htmlFor="input-last-name"
//                     >
//                       Responsável
//                     </label>
//                     <Input
//                       type="select"
//                       id="SelectResponsavel"
//                       disabled
//                       /* value={idMilitar} onChange={(e)=>setIdMilitar(e.target.value)} */
//                     >
//                       <option value="">{nomeMilitar}</option>
//                     </Input>
//                   </FormGroup>
//                 </Col>

//                 <Col lg="10">
//                   <FormGroup>
//                     <label
//                       className="form-control-label"
//                       htmlFor="input-last-name"
//                     >
//                       Chip
//                     </label>
//                     <Input
//                       type="select"
//                       id="SelectResponsavel"
//                       disabled /* onChange='{(e)=>setIdChip(e.target.value)}' */
//                       /* value='{idChip}'  */
//                     >
//                       <option value="">{nunChip}</option>
//                     </Input>
//                   </FormGroup>
//                 </Col>

//                 <Col lg="10">
//                   <FormGroup>
//                     <label
//                       className="form-control-label"
//                       htmlFor="input-last-name"
//                     >
//                       Fiscal do Contrato
//                     </label>
//                     <Input
//                       type="select"
//                       id="SelectResponsavel"
//                       value={nomeFiscal} onChange={(e)=>setNomeFiscal(e.target.value)}
//                     >
//                       <option value=''>Escolha</option>
//                             {fiscais.map((fiscal)=>{
//                               return(
//                                 <option key={fiscal.id} value={fiscal.nome}>{fiscal.nome}</option>
//                               )
//                             })}
//                     </Input>
//                     {emptyevalue && nomeFiscal==='' ? <Alert color='danger'>Coloque o fiscal do contrato</Alert> :''}
//                   </FormGroup>
//                 </Col>

//                 <Col lg="6">
//                   <FormGroup>
//                     <label
//                       className="form-control-label"
//                       htmlFor="input-last-name"
//                     >
//                       Modelo
//                     </label>
//                     <Input
//                       className="form-control-alternative"
//                       id="input-last-name"
//                       disabled
//                       placeholder="Modelo"
//                       type="text"
//                       value={listaAparelhos.modelo}
//                     />
//                   </FormGroup>
//                 </Col>

//                 <Col lg="6">
//                   <FormGroup>
//                     <label
//                       className="form-control-label"
//                       htmlFor="input-username"
//                     >
//                       Marca
//                     </label>
//                     <Input
//                       className="form-control-alternative"
//                       id="input-username"
//                       disabled
//                       value={listaAparelhos.marca}
//                       placeholder="Marca"
//                       type="text"
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6">
//                   <FormGroup>
//                     <label className="form-control-label" htmlFor="input-email">
//                       1º IMEI
//                     </label>
//                     <Input
//                       className="form-control-alternative"
//                       id="input-email"
//                       placeholder="IMEI"
//                       value={listaAparelhos.imei1}
//                       disabled
//                       type="text"
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6">
//                   <FormGroup>
//                     <label
//                       className="form-control-label"
//                       htmlFor="input-first-name"
//                     >
//                       2º IMEI
//                     </label>
//                     <Input
//                       className="form-control-alternative"
//                       id="input-first-name"
//                       disabled
//                       value={listaAparelhos.imei2}
//                       placeholder="IMEI"
//                       type="text"
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//             </div>

//             {/* Address */}
//           </Form>
//         </ModalBody>


//         <ModalFooter>
//           <Button color="success" onClick={HandleDescautelar}>
//           {loading ? (<><Spinner size="sm" color="sucess"></Spinner>{" "}<span>Descautelando</span></>) :
//             (
//               "Descautelar"
//             )}
//           </Button>{/* {' '} */}
         


//                 {/* AQUI */}
//           <Button
//             className="btn_gerarPdf_Descaut"
//             color="danger"
//             onClick={(e) =>

//               ClientesPDF({aparelhos
          

//               })
//             }
//           >
//             <i className="far fa-file-pdf"></i> Gerar PDF
//           </Button>




//           {/* {' '} */}
//           <Button color="warning" onClick={toggle}>
//             Cancelar
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default Modall;


/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
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
  Spinner,
  Alert,
} from "reactstrap";
import "./ModalDescaut.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ClientesPDF from "components/RepostPdf/pdfAparelhosCaut/";
import UsuarioPDF from "components/RepostPdf/pdfAparelhosCaut/index";
import { format } from "date-fns";

function Modall(props) {
  const [modal, setModal] = useState(false);
  const [idChip, setIdChip] = useState("");
  const [nunChip, setNunChip] = useState("");
  const [idMilitar, setIdMilitar] = useState("");

  const [nomeMilitar, setNomeMilitar] = useState([]);
  const [dataFiscal, setDataFiscal] = useState([]);

  // const [nomeMilitar, setNomeMilitar] = useState("");
  // const [listaAparelhos] = useState(props.data);
  // const [loading,setLoading] = useState(false)

  // const toggle = () => {
  //   setModal(!modal);
  // };



  const [fiscais, setFiscais] = useState([]);
  const [nomeFiscal, setNomeFiscal] = useState("");
  const [listaAparelhos, setListaAparelhos] = useState(props.data);
  const [loading, setLoading] = useState(false);
  const [emptyevalue, setEmptyevalue] = useState(false);
  const [formData, setFormData] = useState({
    responsavel: nomeMilitar,
    chip: nunChip,
    fiscalContrato: "",
    modelo: listaAparelhos.modelo,
    marca: listaAparelhos.marca,
    imei1: listaAparelhos.imei1,
    imei2: listaAparelhos.imei2,
  });
  const toggle = () => {
         setModal(!modal);
       };

       ///////////////////////////////////////////////////Pega Data e Fiscal //////////////////////////////////////////////////////////////////

       useEffect(() => {
        async function PegaDataFiscal() {
          try {
            const q = query(
              collection(db, "Cautelas"),
              where("aparelho", "==", props.data.id)
            );
    
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              const valorDoCampoData = format(Date.parse(doc.data().date_caut), 'dd/MM/yyyy')
              const valorDoCampoFiscal = doc.data().fiscal_caut;

              const DataFiscal = {
                data: valorDoCampoData,
                fiscal: valorDoCampoFiscal
              };

              setDataFiscal(DataFiscal);
            });
    
          } catch (error) {
            console.error("Erro ao consultar documento:", error);
          }
        }
        PegaDataFiscal();
      }, [modal]);
      
       ////////////////////////////////////////////////////////pega o chip///////////////////////////////////////////////////
  useEffect(() => {
    async function chipCautelado() {
      try {
        const q = query(
          collection(db, "Cautelas"),
          where("aparelho", "==", props.data.id)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const valorDoCampo = doc.data().chip;
          setIdChip(valorDoCampo);
        });

        if (idChip) {
          getNumero();
        }
      } catch (error) {
        console.error("Erro ao consultar documento:", error);
      }
    }
    chipCautelado();
  }, [modal]);

  async function getNumero() {
    try {
      const docRef = doc(db, "Chip", idChip);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const numero = docSnap.data().numero;
        setNunChip(numero);
      } else {
        console.log("O documento não foi encontrado.");
      }
    } catch (error) {
      console.error("Erro ao obter o número:", error);
    }
  }

  /////////////////////////////////////////////pega o número do militar/////////////////////////////////////////////////////////////

  useEffect(() => {
    async function NomeMilitar() {
      try {
        const q = query(
          collection(db, "Cautelas"),
          where("aparelho", "==", props.data.id)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const valorDoCampo = doc.data().militar;
          setIdMilitar(valorDoCampo);
        });

        if (idMilitar) {
          getNomeMilitar();
        }
      } catch (error) {
        console.error("Erro ao consultar documento:", error);
      }
    }
    NomeMilitar();
  }, [modal]);

  async function getNomeMilitar() {
    try {
      const docRef = doc(db, "Militares", idMilitar);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const nome = docSnap.data().nome;
        const postgrad = docSnap.data().postgrad;
        const funcao = docSnap.data().funcao;
        const rg = docSnap.data().rg;
        const unidade = docSnap.data().unidade;
    
        // Criar um objeto com as informações
        const militarInfo = {
          nome: nome,
          postgrad: postgrad,
          funcao: funcao,
          rg: rg,
          unidade: unidade
        };

        setNomeMilitar(militarInfo);
      } else {
        console.log("O documento não foi encontrado.");
      }
    } catch (error) {
      console.error("Erro ao obter o nome:", error);
    }
  }

  useEffect(() => {
    async function loadFiscais() {
      try {
        const querySnapshot = await getDocs(collection(db, "fiscais_contrato"));

        let listaFiscais = [];
        querySnapshot.forEach((doc) => {
          listaFiscais.push({
            id: doc.id,
            nome: doc.data().nome,
          });
        });

        setFiscais(listaFiscais);
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    }
    loadFiscais();
  }, []);

  async function HandleDescautelar() {
    setLoading(true);

    const dataAtual = new Date();
    const docAparelho = doc(db, "Aparelhos", props.data.id);
    const docChip = doc(db, "Chip", idChip);
    const docMilitar = doc(db, "Militares", idMilitar);

    const q = query(
      collection(db, "Cautelas"),
      where("aparelho", "==", props.data.id)
    );

    const querySnapshot = await getDocs(q);

    let dadosParaUpdate = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dadosParaUpdate.push({
        id: doc.id,
        dados: data,
        date_caut: doc.data().date_caut,
      });
    });

    let datacautela;
    let DocRefCaut;

    const [docSnapChip, docSnapMilitar, docSnapAparelho] = await Promise.all([
      getDoc(docChip),
      getDoc(docMilitar),
      getDoc(docAparelho),
    ]);

    try {

      if (nomeFiscal === "") {
        setEmptyevalue(true);
      } else {
        dadosParaUpdate.forEach(async (documento) => {
          const { id, dados, date_caut } = documento;
          const docRef = doc(db, "Cautelas", id);
          datacautela = date_caut;
          DocRefCaut = docRef;
        });

      dadosParaUpdate.forEach(async (documento) => {
        const { id, date_caut } = documento; // Desestrutura o objeto para obter o ID e os dados

        // Faz o updateDoc aqui usando os dados e o ID do documento
        const docRef = doc(db, "Cautelas", id);
        /* await updateDoc(docRef, {
          cautela: false,
        }); */
        datacautela = date_caut;
        DocRefCaut = docRef
      });


        await updateDoc(docAparelho, {
          cautelado: false,
        });

        await updateDoc(docChip, {
          cautelado: false,
        });


        await addDoc(collection(db, "Devolucoes_aparelhos"), {
          numero: docSnapChip.data().numero,
          linha: docSnapChip.data().linha,
          nserie: docSnapChip.data().nserie,
          funcao: docSnapMilitar.data().funcao,
          nome: docSnapMilitar.data().nome,
          postgrad: docSnapMilitar.data().postgrad,
          rg: docSnapMilitar.data().rg,
          unidade: docSnapMilitar.data().unidade,
          imei1: docSnapAparelho.data().imei1,
          imei2: docSnapAparelho.data().imei2,
          marca: docSnapAparelho.data().marca,
          modelo: docSnapAparelho.data().modelo,
          fiscal_devolu: nomeFiscal,
          date_devolu: dataAtual.toISOString(),
          date_caut: datacautela,
        });

      await addDoc(collection(db, "Devolucoes_aparelhos"), {
        numero: docSnapChip.data().numero,
        linha: docSnapChip.data().linha,
        nserie: docSnapChip.data().nserie,
        funcao: docSnapMilitar.data().funcao,
        nome: docSnapMilitar.data().nome,
        postgrad: docSnapMilitar.data().postgrad,
        rg: docSnapMilitar.data().rg,
        unidade: docSnapMilitar.data().unidade,
        imei1: docSnapAparelho.data().imei1,
        imei2: docSnapAparelho.data().imei2,
        marca: docSnapAparelho.data().marca,
        modelo: docSnapAparelho.data().modelo,
        date_devolu: dataAtual.toISOString(),
        date_caut: datacautela,
      });


        await deleteDoc(DocRefCaut);

        toast.success("O aparelho foi descautelado ");
        toggle();
      }
    } catch (error) {
      toast.error("Ocorreu um erro:", error);
      console.error("Ocorreu um erro:", error);
    } finally {
      setLoading(false);
    }
  }

  

  return (
    <div>
      <Button size="sm" color="success" onClick={toggle}>
        <i className="fa-solid fa-circle-info"></i>
      </Button>

      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Informações</ModalHeader>
        <ModalBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">
              Descautela de Aparelho
            </h6>
            <div className="pl-lg-1">
              <Row>
                <Col lg="10">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Responsável
                    </label>
                    <Input
                      type="select"
                      id="SelectResponsavel"
                      disabled
                      value={nomeMilitar.nome}
                    >
                      <option value="">{nomeMilitar.nome}</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col lg="10">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Chip
                    </label>
                    <Input
                      type="select"
                      id="SelectResponsavel"
                      disabled
                      value={formData.chip}
                    >
                      <option value={nunChip}>{nunChip}</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col lg="10">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Fiscal do Contrato
                    </label>
                    <Input
                      type="select"
                      id="SelectResponsavel"
                      value={nomeFiscal}
                      onChange={(e) => setNomeFiscal(e.target.value)}
                    >
                      <option value="">Escolha</option>
                      {fiscais.map((fiscal) => (
                        <option key={fiscal.id} value={fiscal.nome}>
                          {fiscal.nome}
                        </option>
                      ))}
                    </Input>
                    {emptyevalue && nomeFiscal === "" ? (
                      <Alert color="danger">Coloque o fiscal do contrato</Alert>
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
                      Modelo
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-last-name"
                      disabled
                      placeholder="Modelo"
                      type="text"
                      value={formData.modelo}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
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
                      disabled
                      value={formData.marca}
                      placeholder="Marca"
                      type="text"
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
                      value={formData.imei1}
                      disabled
                      type="text"
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
                      disabled
                      value={formData.imei2}
                      placeholder="IMEI"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={HandleDescautelar}>
            {loading ? (
              <>
                <Spinner size="sm" color="sucess"></Spinner>{" "}
                <span>Descautelando</span>
              </>
            ) : (
              "Descautelar"
            )}
          </Button>
          <Button
            className="btn_gerarPdf_Descaut"
            color="danger"
            onClick={() => ClientesPDF({
              marca:formData.marca, 
              modelo: formData.modelo, 
              imei1: formData.imei1, 
              imei2: formData.imei2, 
              numero: nunChip, 
              nome: nomeMilitar.nome,
              rg: nomeMilitar.rg,
              funcao: nomeMilitar.funcao,
              postgrad: nomeMilitar.postgrad,
              unidade:nomeMilitar.unidade,
              data: dataFiscal.data,
              fiscal: dataFiscal.fiscal

            })}
          >
            <i className="far fa-file-pdf"></i> Gerar PDF
          </Button>
          <Button color="warning" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modall;
