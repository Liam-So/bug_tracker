import express from "express";
import Cors from "cors";
import env from "dotenv";
import admin from "firebase-admin";

// App config
const app = express();
env.config();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(Cors());

// Api endpoint
app.get("/", (req, res) => res.status(200).send("Welcome to the server 😄"));

// Firebase
const serviceData = {
  type: process.env.REACT_APP_TYPE,
  project_id: process.env.REACT_APP_PROJECT_ID,
  private_key_id: process.env.REACT_APP_PRIVATE_KEY_ID,
  private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.REACT_APP_CLIENT_EMAIL,
  client_id: process.env.REACT_APP_ID,
  auth_uri: process.env.REACT_APP_AUTH_URI,
  token_uri: process.env.REACT_APP_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.REACT_APP_AUTH_PROVIDER_URL,
  client_x509_cert_url: process.env.REACT_APP_CLIENT_CERT,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceData),
});

const db = admin.firestore();

// refs
const userRef = db.collection("users");
const projectRef = db.collection("projects");
const ticketRef = db.collection("tickets");

// Get all users
app.get("/users", async (req, res) => {
  try {
    const snapshot = await userRef.get();

    const arrayOfItems = [];
    snapshot.forEach((doc) => {
      arrayOfItems.push(doc.data());
    });

    res.status(200).json(arrayOfItems);
  } catch {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

// get specific user
app.get("/users/:id", async (req, res) => {
  try {
    const snapshot = await userRef.doc(req.params.id).get();
    res.status(200).json(snapshot.data());
  } catch {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

// get all projects
app.get("/projects", async (req, res) => {
  try {
    const snapshot = await projectRef.get();

    const arrayOfItems = [];

    snapshot.forEach(doc => {
      arrayOfItems.push(doc.data());
    });

    res.status(200).send(arrayOfItems);
  } catch {
    res.status(400).send({
      message: "Something went wrong"
    })
  }
})


// get specific project
app.get("/projects/:id", async (req, res) => {
  try {
    const snapshot = await projectRef.doc(req.params.id).get();
    res.status(200).send(snapshot.data());
  } catch {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

// send a new project
app.post("/projects", async (req, res) => {
    try {
      await projectRef.doc(req.body.id).set({
        description: req.body.description,
        id: req.body.id,
        num_bugs: [],
        status: req.body.status,
        team: req.body.team,
        name: req.body.name,
        value: req.body.value,
        label: req.body.label
      });

      res.status(200).send({
        message: "Successfully sent",
      });
    } catch {
      res.status(400).send({
        message: "Something went wrong",
      });
    }
  });

  // update a project
  app.put("/projects/update", async(req, res) => {
    try {
      await projectRef.doc(req.body.id).update({
        name: req.body.name,
        value: req.body.name,
        label: req.body.name,
        status: req.body.status,
        team: req.body.team,
        description: req.body.description
      });

      res.status(200).send({
        message: "Successfully sent"
      });
    } catch {
      res.status(400).send({
        message: "Something went wrong"
      });
    }
  });

  // get all projects that are assigned to a user
  app.get("/projects/forUser/:id", async (req, res) => {
    try {
      let userId = req.params.id;
      const arrayOfProjects = await projectRef.where("team", "array-contains", userId).get();

      const arrayOfItems = [];
      arrayOfProjects.forEach((doc) => {
        arrayOfItems.push(doc.data());
      });
      res.status(200).json(arrayOfItems);
    } catch {
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  });

// get tickets
app.get("/tickets", async (req, res) => {
  try {
    const snapshot = await ticketRef.get();
    const arrayOfItems = [];
    snapshot.forEach((doc) => {
      arrayOfItems.push(doc.data());
    });

    res.status(200).json(arrayOfItems);
  } catch {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

// get ticket by id
app.get("/tickets/:id", async (req, res) => {
  try {
    const snapshot = await ticketRef.doc(req.params.id).get();
    res.status(200).send(snapshot.data());
  } catch {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

// get tickets assigned to user
app.get("/tickets/forUser/:id", async (req, res) => {
  try {
    let userId = req.params.id;
      const arrayOfProjects = await ticketRef.where("user", "==", userId).get();

      const arrayOfItems = [];
      arrayOfProjects.forEach((doc) => {
        arrayOfItems.push(doc.data());
      });
      res.status(200).json(arrayOfItems);
    } catch {
      res.status(400).json({
        message: "Something went wrong",
      });
  }
});

// get tickets for specific project
app.get("/tickets/forProject/:id", async (req, res) => {
  try {
    let projectId = req.params.id;
    const arrayOfTickets = await ticketRef.where('project', '==', projectId).get();

    const resArray = [];

    arrayOfTickets.forEach(ticket => {
      resArray.push(ticket.data());
    });

    res.status(200).send(resArray); 
  } catch {
    res.status(400).send({
      message: "Something went wrong"
    });
  }
})

// send a new ticket
app.post("/tickets", async (req, res) => {
  console.log(req.body)
  try {
    await ticketRef.doc(req.body.id).set({
      description: req.body.description,
      id: req.body.id,
      title: req.body.title,
      type: req.body.type,
      user: req.body.user,
      severity: req.body.severity,
      project: req.body.project,
      comments: req.body.comments,
      value: req.body.value,
      label: req.body.label,
      status: req.body.status
    });

    await projectRef.doc(req.body.project).update({
      num_bugs: admin.firestore.FieldValue.arrayUnion(req.body.id),
    });

    res.status(200).send({
      message: "Successfully sent",
    });
  } catch {
    res.status(400).send({
      message: "Something went wrong",
    });
  }
});

// update ticket
app.put("/tickets/update", async(req, res) => {
  console.log(req.body);

  try {
    await ticketRef.doc(req.body.id).update({
      title: req.body.title,
      value: req.body.value,
      label: req.body.label,
      user: req.body.user,
      type: req.body.type,
      severity: req.body.severity,
      description: req.body.description,
      status: req.body.status
    });

    res.status(200).send({
      message: "Successfully updated"
    });
  } catch {
    res.status(400).send({
      message: "Something went wrong"
    });
  }
})

// update comments in a ticket
app.put("/tickets/updateComments", async (req, res) => {
  try {
    const commentObject = {
      ticketId: req.body.ticketId,
      userId: req.body.userId, 
      time: `${admin.firestore.Timestamp.now().toDate().toDateString()} ${admin.firestore.Timestamp.now().toDate().toLocaleTimeString()}`,
      message: req.body.message
    }

    await ticketRef.doc(req.body.ticketId).update({
      comments: admin.firestore.FieldValue.arrayUnion(commentObject),
    });
    
    res.status(200).send({
      message: "Successfully sent"
    })
  } catch {
    res.status(400).send({
      message: "Something went wrong"
    })
  }
})

// listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));