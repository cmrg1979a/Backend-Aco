import * as fs from "fs";
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";

import axios from "axios";
import { Request, Response } from "express";
import { readFileSync } from "fs";
import { Buffer } from "buffer";
require("isomorphic-fetch");

// // ------------------------------------------------------
// export const crearCarpetaEnOneDriveCotizacion = async (
//   req: Request,
//   res: Response
// ) => {
//   const token = await obtenerTokenDeAcceso();
//   // let namaCarpeta = "quote";
//   let namaCarpeta = "PUBLICA";
//   const client = Client.init({
//     authProvider: (done) => {
//       done(null, token);
//     },
//   });

//   try {
//     const userPrincipalName = "desarrollo@piccargope.onmicrosoft.com";

//     const existeCarpetaQuote = await client
//       .api(`/users/${userPrincipalName}/drive/root:/${namaCarpeta}`)
//       .get()
//       .then(() => true)
//       .catch(() => false);

//     if (!existeCarpetaQuote) {
//       // Si la carpeta "quote" no existe, crearla primero
//       await client.api(`/users/${userPrincipalName}/drive/root/children`).post({
//         name: namaCarpeta,
//         folder: {},
//         "@microsoft.graph.conflictBehavior": "rename",
//       });
//     }
//     let children = await client
//       .api(`/users/${userPrincipalName}/drive/root/children`)
//       .get();

//     let idFolderQuote = children.value.filter((v) => v.name == namaCarpeta)[0]
//       .id;

//     /* sub carpeta------------------------------*/
//     let subCarpeta = "COTIZACIONES";
//     let childrenSubCaperta = await client
//       .api(`/users/${userPrincipalName}/drive/items/${idFolderQuote}/children`)
//       .get();

//     let idFolderQuoteSubCaperta = childrenSubCaperta.value.filter(
//       (v) => v.name == subCarpeta
//     )[0].id;
//     /** sub sub carpeta */
//     let subSubCarpeta = "CORRELATIVO DE COTIZACION ACTUALIZADO";
//     let childrenSubSubCaperta = await client
//       .api(
//         `/users/${userPrincipalName}/drive/items/${idFolderQuoteSubCaperta}/children`
//       )
//       .get();

//     let idFolderQuoteSubSubCaperta = childrenSubSubCaperta.value.filter(
//       (v) => v.name == subSubCarpeta
//     )[0].id;

//     // Guardando en la carpeta quote
//     const carpeta = await client
//       .api(
//         `/users/${userPrincipalName}/drive/items/${idFolderQuoteSubSubCaperta}/children`
//       )
//       .post({
//         name: req.query.nombrecotizacion,
//         folder: {},
//         "@microsoft.graph.conflictBehavior": "rename",
//       })
//       .catch((e) => {
//         console.log(e);
//       });

//     // Devuelve la carpeta creada en la respuesta si es necesario
//     res.json({
//       status: 200,
//       statusBol: true,
//       data: carpeta.webUrl,
//     });
//   } catch (error) {
//     console.log("Error al crear la carpeta en OneDrive:", error);
//     if (error.innerError) {
//       console.error("Detalles adicionales del error:", error.innerError);
//     }
//     // Maneja el error y devuelve una respuesta adecuada
//   }
// };
// ------------------------------------------------------
export const crearCarpetaEnOneDriveCotizacion = async (
  req: Request,
  res: Response
) => {
  const token = await obtenerTokenDeAcceso();
  let namaCarpeta = "quote";
  // let namaCarpeta = "PUBLICA";
  const client = Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });

  try {
    const userPrincipalName = "desarrollo@piccargope.onmicrosoft.com";

    const existeCarpetaQuote = await client
      .api(`/users/${userPrincipalName}/drive/root:/${namaCarpeta}`)
      .get()
      .then(() => true)
      .catch(() => false);

    if (!existeCarpetaQuote) {
      // Si la carpeta "quote" no existe, crearla primero
      await client.api(`/users/${userPrincipalName}/drive/root/children`).post({
        name: namaCarpeta,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename",
      });
    }
    let children = await client
      .api(`/users/${userPrincipalName}/drive/root/children`)
      .get();

    let idFolderQuote = children.value.filter((v) => v.name == namaCarpeta)[0]
      .id;

    // Guardando en la carpeta quote
    const carpeta = await client
      .api(`/users/${userPrincipalName}/drive/items/${idFolderQuote}/children`)
      .post({
        name: req.query.nombrecotizacion,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename",
      })
      .catch((e) => {
        console.log(e);
      });

    // Devuelve la carpeta creada en la respuesta si es necesario
    res.json({
      status: 200,
      statusBol: true,
      data: carpeta.webUrl,
    });
  } catch (error) {
    console.log("Error al crear la carpeta en OneDrive:", error);
    if (error.innerError) {
      console.error("Detalles adicionales del error:", error.innerError);
    }
    // Maneja el error y devuelve una respuesta adecuada
  }
};
// ------------------------------------------------------
// export const crearCarpetaEnOneDriveMaster = async (
//   req: Request,
//   res: Response
// ) => {
//   const token = await obtenerTokenDeAcceso();
//   // let namaCarpeta = "master";
//   let namaCarpeta = "PUBLICA";
//   const client = Client.init({
//     authProvider: (done) => {
//       done(null, token);
//     },
//   });

//   try {
//     const userPrincipalName = "desarrollo@piccargope.onmicrosoft.com";

//     const existeCarpetaMaster = await client
//       .api(`/users/${userPrincipalName}/drive/root:/${namaCarpeta}`)
//       .get()
//       .then(() => true)
//       .catch(() => false);

//     if (!existeCarpetaMaster) {
//       // Si la carpeta "master" no existe, crearla primero
//       await client.api(`/users/${userPrincipalName}/drive/root/children`).post({
//         name: namaCarpeta,
//         folder: {},
//         "@microsoft.graph.conflictBehavior": "rename",
//       });
//     }
//     let children = await client
//       .api(`/users/${userPrincipalName}/drive/root/children`)
//       .get();

//     let idFolderMaster = children.value.filter((v) => v.name == namaCarpeta)[0]
//       .id;
//     /** */
//     let subCarpeta = "OPERACIONES EXPEDIENTES";
//     let childrenSubCarpeta = await client
//       .api(`/users/${userPrincipalName}/drive/items/${idFolderMaster}/children`)
//       .get();

//     let idFolderMasterSubCarpeta = childrenSubCarpeta.value.filter(
//       (v) => v.name == subCarpeta
//     )[0].id;

//     // Guardando en la carpeta quote
//     const carpeta = await client
//       // .api(`/users/${userPrincipalName}/drive/items/root:/`)
//       .api(
//         `/users/${userPrincipalName}/drive/items/${idFolderMasterSubCarpeta}/children`
//       )
//       .post({
//         name: req.query.nromaster,
//         folder: {},
//         "@microsoft.graph.conflictBehavior": "rename",
//       })
//       .catch((e) => {
//         console.log(e);
//       });

//     // Devuelve la carpeta creada en la respuesta si es necesario
//     res.json({
//       status: 200,
//       statusBol: true,
//       data: carpeta.webUrl,
//     });
//   } catch (error) {
//     console.log("Error al crear la carpeta en OneDrive:", error);
//     if (error.innerError) {
//       console.error("Detalles adicionales del error:", error.innerError);
//     }
//     // Maneja el error y devuelve una respuesta adecuada
//   }
// };
export const crearCarpetaEnOneDriveMaster = async (
  req: Request,
  res: Response
) => {
  const token = await obtenerTokenDeAcceso();
  let namaCarpeta = "master";
  console.log("hola bb");
  const client = Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });
  console.log(client);

  try {
    const userPrincipalName = "desarrollo@piccargope.onmicrosoft.com";

    const existeCarpetaMaster = await client
      .api(`/users/${userPrincipalName}/drive/root:/${namaCarpeta}`)
      .get()
      .then(() => true)
      .catch(() => false);

    if (!existeCarpetaMaster) {
      // Si la carpeta "master" no existe, crearla primero
      await client.api(`/users/${userPrincipalName}/drive/root/children`).post({
        name: namaCarpeta,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename",
      });
    }
    let children = await client
      .api(`/users/${userPrincipalName}/drive/root/children`)
      .get();

    let idFolderMaster = children.value.filter((v) => v.name == namaCarpeta)[0]
      .id;

    // Guardando en la carpeta master
    const carpeta = await client
      // .api(`/users/${userPrincipalName}/drive/items/root:/`)
      .api(`/users/${userPrincipalName}/drive/items/${idFolderMaster}/children`)
      .post({
        name: req.query.nromaster,
        folder: {},
        "@microsoft.graph.conflictBehavior": "rename",
      })
      .catch((e) => {
        console.log(e);
      });

    // Devuelve la carpeta creada en la respuesta si es necesario
    res.json({
      status: 200,
      statusBol: true,
      data: carpeta.webUrl,
    });
  } catch (error) {
    console.log("Error al crear la carpeta en OneDrive:", error);
    if (error.innerError) {
      console.error("Detalles adicionales del error:", error.innerError);
    }
    // Maneja el error y devuelve una respuesta adecuada
  }
};

const obtenerTokenDeAcceso = async (): Promise<string> => {
  const credential = new ClientSecretCredential(
    process.env.tenantId,
    process.env.clientId,
    process.env.clientSecret
  );

  const scopes = [
    "https://graph.microsoft.com/.default",
    "https://graph.microsoft.com/Files.ReadWrite.All",
  ];

  let accessToken: string | null = null;

  for (const scope of scopes) {
    try {
      const tokenResponse = await credential.getToken(scope);

      if (tokenResponse && tokenResponse.token) {
        accessToken = tokenResponse.token;
        break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (accessToken) {
    return accessToken;
  }

  throw new Error("No se pudo obtener el token de acceso");
};

// export const subirPDFaOneDrive = async (req: Request, res: Response) => {
//   const token = await obtenerTokenDeAcceso();

//   const uploadUrl = await obtenerURLSubida(
//     req.body.numeroCotizacion,
//     req.body.nombreArchivoPDF,
//     token
//   );

//   if (uploadUrl) {
//     try {
//       const archivoPDFBuffer = readFileSync(req.body.nombreArchivoPDF);
//       const archivoPDF = Buffer.from(archivoPDFBuffer).toString("base64");

//       await axios.put(uploadUrl, archivoPDF, {
//         headers: {
//           "Content-Type": "application/pdf",
//         },
//       });
//     } catch (error) {
//       console.error("Error al subir el PDF a OneDrive:", error);
//     }
//   }
// };

// const obtenerURLSubida = async (
//   numeroCotizacion: string,
//   nombreArchivoPDF: string,
//   token: string
// ) => {
//   const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${numeroCotizacion}/${nombreArchivoPDF}:/createUploadSession`;

//   try {
//     const response = await axios.post<string>(uploadUrl, null, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener la URL de subida:", error);
//     return null;
//   }
// };
