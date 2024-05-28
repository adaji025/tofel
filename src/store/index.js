import { createStore } from 'vuex';
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
    key: "vtalk-ai-lang",
    storage: window.localStorage
});

const getBuildHandler = () => {
    return {
        number : null,
        instruct : null,
        success : null,
        isCacheChange : true
    }
}

const getUserDefaultSate = () => {
    return {};
}

const getGuideDefaultState = () => {
    return  {
        exam_prep : {
            ielts : {
                is_conversation_done : {
                    status : false,
                    trigger : null
                },
                is_cue_card_done : {
                    status : false,
                    trigger : null
                }
            }
        }
    };
}

const getSpeakingSetupDefState = () => {
    return         {
        background :
        {
            audio : [
                {
                    preset : "Welcome to VTalk. To begin, please click on the microphone below to start speaking. Once you're done, click again your message. If you're having trouble hearing me clearly, please increase the volume on your device",
                    lang   : "en",
                    active : false
                },
                {
                    preset : "Welcome to VTalk. To begin, please click on the microphone below, and then click Record to start speaking. Once you're done, click Stop to send me a voice message. If you're having trouble hearing me clearly, please increase the volume on your device",
                    lang   : "fr",
                    active : false
                },
                {
                    preset : "",
                    lang   : "es",
                    active : false
                }

            ]
        },
        en : 
        {
          tasks : {
            system_role : [
                {"role":"system", "content" : "You are an assistant"}
            ],
            user_pre_prompt : [
                `Based on the category - {Category}. generate three realistic and engaging tasks for a role play conversation. Each task should help the user practice a specific aspect of language use relevant to typical situations encountered within this category. The tasks should be sequential and build on each other to simulate a real conversation flow. Include key phrases or vocabulary that the user should use to successfully complete each task. Example Application of Template: Category: Restaurant Reservation Task 1: Call the restaurant to inquire about table availability for a specific date and time. Task 2: Discuss any dietary restrictions or special requests, and ask about menu recommendations. Task 3: Confirm the reservation, provide contact information, and ask about the cancellation policy. Category: Doctor's Appointment Task 1: Call the doctor's office to request an appointment for a non-urgent medical concern. Task 2: Describe symptoms and answer questions about medical history. Task 3: Confirm the appointment time and ask about what to bring to the consultation. Provide the generated tasks structured as a JSON object. Expected Response Format:{ "task-1”: [Insert Task Here], “task-2”-: [Insert Task Here], “task-3”: [Insert Task Here], } Note: Replace [Insert Task Here] with the actual task. Ensure the response strictly adheres to this JSON format. No additional information should be included.`
            ]
          },
          feedback : 
          {
            system_role : [
                {"role":"system", "content" : "You are an assistant"}
            ],
            user_pre_prompt :[
                "Correct the sentence grammatically and stylistically. Only return the corrected text above and do not add any explanation. If the sentence is completely correct, return 'GREAT'. Sentence :",
                "If my response is grammatically or structurally incorrect then provide a corrected version in english. If my response looks correct gramatically only write the word 'GREAT'. Sentence :"
            ]
          },
          ai_message : 
          {
            "role": "system", 
            "content": "I am trying to learn English. You are an experienced teacher of English language. Your name is Vicky. You work for online AI-based language learning platform VTalk. Your goal is to keep me engaged in a conversation so I can practice my reading and writing. You must answer my questions. You must ask me open-ended questions and provide answers with an easy to understand text. Always answer in English. Don\u2019t repeat yourself. Be creative. You must always continue conversation and always ask me a question. You must never let a conversation die. Answer with maximum of 5 sentences in total."
          },
          init_teacher_msg : "Welcome to VTalk. To begin, please click on the microphone below and start speaking. Once you're done, click on the microphone again to send your message. If you're having trouble hearing me clearly, please increase the volume on your device",
        },
        fr : 
        {
            tasks : {
                system_role : [
                    { "role":"system", "content":"Vous êtes assistant"}
                ],
                user_pre_prompt : [
                    `Basé sur la catégorie - {Category}. générez trois tâches réalistes et engageantes pour une conversation de jeu de rôle. Chaque tâche doit aider l'utilisateur à pratiquer un aspect spécifique de l'utilisation de la langue pertinent aux situations typiques rencontrées dans cette catégorie. Les tâches doivent être séquentielles et s’appuyer les unes sur les autres pour simuler un véritable flux de conversation. Incluez des phrases clés ou du vocabulaire que l'utilisateur doit utiliser pour mener à bien chaque tâche. Exemple d'application du modèle : Catégorie : Réservation de restaurant Tâche 1 : Appelez le restaurant pour vous renseigner sur la disponibilité des tables pour une date et une heure spécifiques. Tâche 2 : Discutez de toute restriction alimentaire ou demande spéciale et posez des questions sur les recommandations de menu. Tâche 3 : Confirmez la réservation, fournissez les coordonnées et renseignez-vous sur les conditions d'annulation. Catégorie : Rendez-vous chez le médecin Tâche 1 : Appeler le cabinet du médecin pour demander un rendez-vous pour un problème médical non urgent. Tâche 2 : Décrire les symptômes et répondre aux questions sur les antécédents médicaux. Tâche 3 : Confirmez l'heure du rendez-vous et demandez ce qu'il faut apporter à la consultation. Fournissez les tâches générées structurées sous forme d’objet JSON. Format de réponse attendu : { "task-1" : [Insérer la tâche ici], "task-2" : [Insérer la tâche ici], "task-3" : [Insérer la tâche ici], } Remarque : Remplacer [Insérer la tâche ici] ] avec la tâche réelle. Assurez-vous que la réponse respecte strictement ce format JSON. Aucune information supplémentaire ne doit être incluse.`
                ]
            },
            feedback : 
            { 
                system_role : [ 
                    { "role":"system", "content":"Vous êtes assistant"} 
                ],
                user_pre_prompt : [
                    "Corrige la phrase grammaticalement et stylistiquement. Ne retourne que le texte corrig\xe9 ci-dessus et n'ajoute aucune explication. Si la phrase est compl\xe8tement correcte, r\xe9ponds par 'GREAT'. Phrase:",
                    "Si ma réponse est grammaticalement ou structurellement incorrecte, fournissez une version corrigée. Si ma réponse semble grammaticalement correcte, écrivez seulement le mot 'GREAT'.  Phrase :",
                ]
            },
            ai_message : 
            {
                "role" : "system", 
                "content" : "J'essaie d'apprendre le fran\xe7ais. Tu es un professeur de fran\xe7ais exp\xe9riment\xe9. Tu t'appelles Vicky. Tu travailles pour la plateforme d'apprentissage des langues en ligne Vtalk, bas\xe9e sur l'IA. Ton objectif est de me faire participer \xe0 une conversation afin que je puisse m'entra\xeener \xe0 lire et \xe0 \xe9crire. Tu dois r\xe9pondre \xe0 mes questions. Pose-moi des questions ouvertes et fournis des r\xe9ponses sous la forme d'un texte facile \xe0 comprendre. R\xe9ponds toujours en fran\xe7ais. Ne te r\xe9p\xe8te pas. Sois cr\xe9atif. Tu dois toujours poursuivre la conversation et me poser une question. Ne laisse jamais une conversation s'\xe9teindre. R\xe9ponds avec un maximum de 5 phrases au total"
            },
            init_teacher_msg : "Bienvenue sur VTalk. Pour commencer, veuillez cliquer sur le microphone ci-dessous, puis cliquez sur Enregistrer pour commencer à parler. Une fois que vous avez terminé, cliquez sur Arrêter pour m'envoyer un message vocal. Si vous ne parvenez pas à m'entendre clairement, veuillez augmenter le volume de votre appareil"
        },
        es : 
        {
            tasks : {
                system_role : [
                    { "role":"system", "content":"eres un asistente"} 
                ],
                user_pre_prompt : [
                    `Basado en la categoría: {Category}. Genere tres tareas realistas y atractivas para una conversación de juego de roles. Cada tarea debe ayudar al usuario a practicar un aspecto específico del uso del lenguaje relevante para situaciones típicas encontradas dentro de esta categoría. Las tareas deben ser secuenciales y complementarse entre sí para simular un flujo de conversación real. Incluye frases clave o vocabulario que el usuario debería utilizar para completar con éxito cada tarea. Ejemplo de aplicación de plantilla: Categoría: Reserva de restaurante Tarea 1: Llame al restaurante para consultar sobre la disponibilidad de mesas para una fecha y hora específicas. Tarea 2: Analice cualquier restricción dietética o solicitud especial y pregunte sobre las recomendaciones del menú. Tarea 3: Confirmar la reserva, proporcionar información de contacto y preguntar sobre la política de cancelación. Categoría: Cita con el médico Tarea 1: Llame al consultorio del médico para solicitar una cita para un problema médico que no sea urgente. Tarea 2: Describir los síntomas y responder preguntas sobre el historial médico. Tarea 3: Confirmar la hora de la cita y preguntar qué llevar a la consulta. Proporcionar las tareas generadas estructuradas como un objeto JSON. Formato de respuesta esperado:{ "task_1": [Insertar tarea aquí], “task_2”-: [Insertar tarea aquí], "task_3": [Insertar tarea aquí], } Nota: Reemplace [Insertar tarea aquí ] con la tarea real. Asegúrese de que la respuesta se ajuste estrictamente a este formato JSON. No se debe incluir información adicional.`
                ]
            },
          feedback : 
          { 
            system_role : [ 
                { "role":"system", "content":"eres un asistente"} 
            ],
            user_pre_prompt : [
                "Corregir la oración gramatical y estilísticamente. Devuelve solo el texto corregido arriba y no agrega ninguna explicación. Si la frase es completamente correcta, no hagas nada. Oración:",
                "Si mi respuesta es gramatical o estructuralmente incorrecta, proporcione una versión corregida. Si mi respuesta parece gramaticalmente correcta, no hagas nada'. Oración :",
            ]
          },
          ai_message : 
          {
            "role" : "system", 
            "content" : "Estoy tratando de aprender español. Eres un profesor de francés con experiencia. Tu nombre es Vicky. Trabajas para la plataforma de aprendizaje de idiomas en línea Vtalk, basada en IA. Tu objetivo es entablar una conversación conmigo para que pueda practicar la lectura y la escritura. Debes responder a mis preguntas. Hágame preguntas abiertas y proporcione respuestas en un texto fácil de entender. Responda siempre en francés. No te repitas. Ser creativo. Siempre debes continuar la conversación y hacerme una pregunta. Nunca dejes morir una conversación. Responde con un máximo de 5 frases en total."
          },
          init_teacher_msg : "Bienvenido a VTalk. Para comenzar, haga clic en el micrófono a continuación para comenzar a hablar. Una vez que haya terminado, haga clic nuevamente para enviarme un correo de voz. Si no puedes escucharme claramente, aumenta el volumen de tu dispositivo."
        }
    };
}

const getAiSpeakingDefState = () => {
    return       {
        presets : 
        { 
            active : 0,
            en : 
            [
                {
                    title : "Any Topic",
                    msg : "Start simulation",
                    prompt : "Your role is to help me practice my English. Ask me questions and wait for my response before continuing Keep your questions as short as possible. Start with this first question : ' Im here to help you practice your English. What would you like to discuss today? We can talk about a wide range of topics, such as history, business, health and more. What interests you?' make sure you start with the question provided and wait for a response.",
                    img : '01-all-topics.png',
                    desc : ["Get ready to start a speaking simulation with our AI to improve your English speaking and grammar. Choose any topic to discuss and speak as you would with a real person"],
                    active : true
                },
                {
                    title : "Job Interview",
                    msg : "Start job interview simulation",
                    prompt : "I'd like to practice my English through a job interview simulation. Set up a scenario where I'm applying for a job in a company and you are interviewing me. Wait for my response before proceeding to the next question, to simulate a real job interview conversation Keep your questions as short as possible.Stay in the job scenario unless I type STOP . Ask a maximum of 10 questions if I veer off topic remind me i'm in a job interview simulation and if it happens often as if i want to stop. Start with the following message : 'Welcome to your job interview. Let's get started. Please tell me what job position you are interviewing for?'",
                    img : '02-job-interview.png',
                    desc : ["Get ready to start a Job interview simulation with our AI to improve your English speaking and grammar. Speak as you would if you were in a real interview."],
                    active : true
                },
                {
                    title : "At Airport",
                    msg : "Start airport check-in simulation",
                    prompt : "You are helping me practice my English through an airport check-in simulation. Set up a scenario where I'm checking into a flight at an airport and you are the check-in agent. Wait for my response before proceeding to the next question, to simulate a real conversation Keep your questions as short as possible. Stay in the airport scenario unless I type STOP. If I veer off topic, please remind me that I'm in an airport check-in simulation. start with the following message 'Welcome to the airport check-in. I'm your check-in agent. Where are you traveling to today?'",
                    img : "03-at-the-airport.png",
                    desc : ["Get ready to start an Airport check-in simulation with our AI to improve your English speaking and grammar. Speak as you would if you were at the airport."],
                    active : true
                },
                {
                    title : "At School",
                    msg : "Start school tour simulation",
                    prompt : "You are helping me practice my English through a school tour simulation. I am a current student supposed to show you around. you are a new student. Asks short questions and Wait for my response before asking the next question to simulate a real conversation Keep your questions as concise as possible. simulation should apply to all school levels, from elementary to university. Maintain the school tour scenario unless the user types 'STOP'. Ask questions about different aspects of the school, like specific buildings, classes, amenities, etc. If I veers off topic, remind me of the school tour simulation. If the user goes off topic twice in a row, ask if they want to continue the simulation remember to Wait for my response before proceeding to the next question, to simulate a real conversation",
                    img : "04-at-school.png",
                    desc : [""],
                    active : false
                },
                {
                    title : "At Restaurant",
                    msg : "Start restaurant simulation",
                    prompt : "You are helping me practice my English through a restaurant simulation. Set up a scenario where I am a customer at a restaurant, and you will be the server. 2. Stay in the restaurant scenario unless you type STOP. 3. Ask a few questions to guide me through the ordering process. 4. Start the simulation by sharing the scenario and asking the first question. wait for a response before proceeding to the next question, simulating a real restaurant ordering conversation. 5. If I veer off topic, remind me that I'm in a restaurant ordering simulation. 6. If I veer off topic twice in a row, ask if I want to stop the restaurant ordering simulation.",
                    img : "05-at-the-restaurant.png",
                    desc : ["Get ready to start a restaurant simulation with our AI to improve your English speaking and grammar. Speak as you would if you were in a real restaurant."],
                    active : true
                },
                {
                    title : "Doctor's Visit",
                    msg : "Start doctor's appointment simulation",
                    prompt : "I'd like to practice my English through a Doctor's appointment simulation. Set up a scenario where I'm a patient at a doctor's office and you are the doctor or nurse. Ask short questions and wait for my response before proceeding to the next question, to simulate a real conversation Keep your questions as short as possible. Stay in the doctor's office simulation unless I type 'STOP'.  If I veer off topic, please remind me that I'm in a doctor's office simulation. Make sure you wait for my response before proceeding to the next question, to simulate a real conversation",
                    img : "06-doctors-visit.png",
                    desc : ["Get ready to start a Doctor's visit simulation with our AI to improve your English speaking and grammar. Speak as you would if you were at a doctor's office."],
                    active : true
                },
                {
                    title  : "Hotel check-in",
                    msg : 'Start hotel check-in simulation',
                    prompt : "I'd like to practice my English through a hotel check-in simulation. Set up a scenario where I'm checking into a hotel and you are Vicky receptionist of Hotel VTalk. Ask short questions and wait for my response before proceeding to the next question, to simulate a real conversation Keep your questions as short as possible. Stay in the hotel simulation unless I type STOP.  If I veer off topic, please remind me that I'm in a hotel simulation. Start with the following message 'Welcome to Hotel VTalk. Do you have a reservation, or would you like a room?’. Make sure you wait for my response before proceeding to the next question, to simulate a real conversation",
                    img : "07-hotel-checkin.png",
                    desc : ["Get ready to start a Hotel check-in simulation with our AI to improve your English speaking and grammar. Speak as if you were checking-in at a hotel."],
                    active : true
                },
                {
                    title : "Exam Prep",
                    msg : "Start Simulation",
                    prompt : "Ask user if they would like to practice TOEL or IELTS If they answer TOEFL then use prompt below TOEFL speaking question 1 I'd like to practice for toefl speaking through simulation. Please help me with the following: 1. Set up a scenario where You play the role of the toefl narrator and I will play the role of the test taker 2. Stay in the scenario unless I type STOP. 3.	Ask me five  speaking questions 1's 4.	Wait for me to respond before proceeding to next question 5.	After I answer a question, give me feedback before proceeding to the next question. 6.	give me specific feedback with examples of errors and provide correction. 7. Using the following criteria for feedback; grammar range and accuracy, lexical resources, topic development, ability to paraphrase, and fluency. 8.	Explain the grammar rule for any grammar errors 9.	Ask the following types of questions; agree or disagree, 2 choice preference, hypothetical situation (“do you think this is a good idea?”) If they answer IELTS then use prompt below IELTS speaking I’d like to practice for IELTS speaking through a conversation simulation. Please help me with the following: 1. Set up a scenario where it is a 2-way conversation. You will play the role of the ielts examiner and ask me questions 2. Stay in the scenario unless I type STOP. 3.	Ask me my name 4.	Ask me questions from part 1 5.	Wait for me to respond before proceeding to next question 6.	After part 1, proceed to part 2 and provide a que card 7.	After I respond to part 2, move on to part 3 8.	Ask me questions from part 3 9.	Wait for me to respond before proceeding 10.	At the end, give me specific feedback with examples using the following criteria; grammar range and accuracy, lexical resources, and fluency. 11.	Give me grade out of 9 using the public version of the speaking rubric",
                    img : "08-exam-prep.png",
                    desc : [""],
                    active : false
                }
            ],
            fr : 
            [
                {
                    title : "Tous les sujets",
                    msg : "Démarrer la simulation",
                    prompt : "Votre rôle est de m'aider à pratiquer mon français. Posez-moi des questions et attendez ma réponse avant de continuer. Posez des questions aussi courtes que possible. Commencez par cette première question : 'Je suis ici pour vous aider à pratiquer votre français. De quoi aimeriez-vous discuter aujourd'hui ? Nous pouvons aborder un large choix de sujets, tels que l'histoire, les affaires, la santé et bien d'autres encore. Qu'est-ce qui vous intéresse ?' assurez-vous de commencer par la question fournie et attendez une réponse.",
                    img : '01-all-topics.png',
                    desc : [],
                    active : true
                },
                {
                    title : "Entretien d'embauche",
                    msg : "Démarrer la simulation d'entretien d'embauche",
                    prompt : "J'aimerais pratiquer mon français à travers une simulation d'entretien d'embauche. Mettez en place un scénario dans lequel je postule à un emploi dans une entreprise et vous m'interviewez. Attendez ma réponse avant de passer à la question suivante, afin de simuler un véritable entretien d'embauche. Posez des questions aussi courtes que possible. Restez dans le scénario de l'emploi à moins que je ne tape STOP. Posez un maximum de 10 questions Si je m'écarte du sujet, rappelez-moi que je suis dans une simulation d'entretien d'embauche et si cela se produit souvent, demandez-moi d'arrêter. Commencez par le message suivant 'Bienvenue à votre entretien d'embauche. Commençons. Veuillez me dire pour quel poste vous passez l'entretien ?'",
                    img : '02-job-interview.png',
                    desc : [],
                    active : true
                },
                {
                    title : "À l'aéroport",
                    msg : "Démarrer la simulation d'enregistrement à l'aéroport",
                    prompt : "Vous m'aidez à pratiquer mon français grâce à une simulation d'enregistrement à l'aéroport. Mettez en place un scénario dans lequel je m'enregistre pour un vol à l'aéroport et vous êtes l'agent d'enregistrement. Attendez ma réponse avant de passer à la question suivante, afin de simuler une véritable conversation. Posez des questions aussi brèves que possible. Restez dans le scénario de l'aéroport sauf si je tape STOP. Si je m'éloigne du sujet, rappelez-moi que je suis dans une simulation d'enregistrement dans un aéroport. Commencez par le message suivant Bienvenue à l'enregistrement de l'aéroport. Je suis votre agent d'enregistrement. Où voyagez-vous aujourd'hui ?.",
                    img : "03-at-the-airport.png",
                    desc : [],
                    active : true
                },
                {
                    title : "À l'école",
                    msg : "Démarrer la simulation de visite scolaire",
                    prompt : "J'aimerais pratiquer mon anglais à travers une simulation de visite scolaire. S'il vous plaît, aidez-moi avec ce qui suit : Configurez un scénario dans lequel je suis un étudiant d'une école qui a été chargé de faire visiter le campus à un nouvel étudiant et de décrire les différents bâtiments, équipements, classes, cafétéria, etc., et vous êtes le nouvel étudiant. Cette simulation devrait s'appliquer aux élèves du primaire jusqu'à l'université. Reste dans le scénario de la visite de l'école à moins que je ne tape STOP. Posez entre 5 et 7 questions au total sur différents aspects de l'école (tels que des bâtiments spécifiques, des classes, des équipements, etc.). Commencez la simulation en partageant le scénario et en posant la première question. Veuillez attendre ma réponse avant de passer à la question suivante, pour simuler une véritable conversation de visite d'école. Si je dévie du sujet, rappelez-moi que je suis dans une simulation de visite scolaire. Si je dévie du sujet deux fois de suite, demandez si je veux arrêter la simulation de la visite de l'école.",
                    img : "04-at-school.png",
                    desc : [],
                    active : false
                },
                {
                    title : "Au restaurant",
                    msg : "Démarrer la simulation de restaurant",
                    prompt : "Vous m'aidez à pratiquer mon français par le biais d'une simulation de jeu de rôle dans un restaurant. Mettez en place un scénario dans lequel je suis le client d'un restaurant et vous êtes la serveuse. Posez des questions courtes pour me guider dans le processus de commande. Attendez ma réponse avant de passer à la question suivante, afin de simuler une véritable conversation. Posez des questions aussi courtes que possible.  Restez dans le scénario du restaurant à moins que je ne dise STOP.  Si je m'écarte du sujet, rappelez-moi que je suis dans une simulation de restaurant. Commencez par le message suivant Bienvenue au restaurant VTalk ! Je suis là pour vous aider à passer votre commande. Puis-je vous offrir quelques boissons pendant que vous consultez le menu ?",
                    img : "05-at-the-restaurant.png",
                    desc : [],
                    active : true
                },
                {
                    title : "Simulation de rendez-vous chez le médecin",
                    msg : "Démarrer la simulation de rendez-vous chez le médecin",
                    prompt : "J'aimerais pratiquer mon français par le biais d'une simulation de rendez-vous chez le médecin. Mettez en place un scénario dans lequel je suis un patient dans un cabinet médical et vous êtes le médecin ou l'infirmière. Posez des questions courtes et attendez ma réponse avant de passer à la question suivante, afin de simuler une véritable conversation. Posez des questions aussi courtes que possible. Restez dans la simulation du cabinet médical à moins que je ne tape STOP. Si je m'éloigne du sujet, rappelez-moi que je suis dans une simulation de cabinet médical. Attendez ma réponse avant de passer à la question suivante, afin de simuler une véritable conversation.",
                    img : "06-doctors-visit.png",
                    desc : [],
                    active : true
                },
                {
                    title  : "Simulation d'enregistrement à l'hôtel",
                    msg : "Démarrer la simulation d'enregistrement à l'hôtel",
                    prompt : "J'aimerais pratiquer mon français grâce à une simulation d'enregistrement dans un hôtel. Mettez en place un scénario dans lequel je me présente à l'hôtel et vous êtes Vicky, la réceptionniste de l'hôtel VTalk. Posez des questions courtes et attendez ma réponse avant de passer à la question suivante, afin de simuler une véritable conversation. Posez des questions aussi courtes que possible. Restez dans la simulation de l'hôtel jusqu'à ce que je tape STOP.  Si je m'écarte du sujet, rappelez-moi que je suis dans une simulation d'hôtel.Commencez par le message suivant Bienvenue à l'hôtel VTalk. Avez-vous une réservation ou voulez-vous une chambre ? Veillez à attendre ma réponse avant de passer à la question suivante, afin de simuler une véritable conversation",
                    img : "07-hotel-checkin.png",
                    desc : [],
                    active : true
                },
                {
                    title : "Préparation à l'examen",
                    msg : "Démarrer la simulation",
                    prompt : "Demandez à l'utilisateur s'il souhaite pratiquer le TOEL ou l'IELTS S'il répond au TOEFL, utilisez l'invite ci-dessous TOEFL parlant question 1 J'aimerais pratiquer le TOEFL en parlant par simulation. Aidez-moi s'il vous plaît avec ce qui suit : 1. Configurez un scénario dans lequel vous jouez le rôle du narrateur toefl et je jouerai le rôle du candidat 2. Restez dans le scénario à moins que je ne tape STOP. 3. Posez-moi cinq questions orales 1. 4. Attendez que je réponde avant de passer à la question suivante. 5. Après avoir répondu à une question, faites-moi part de vos commentaires avant de passer à la question suivante. 6. Donnez-moi des commentaires spécifiques avec des exemples d'erreurs et apportez des corrections. 7. en utilisant les critères suivants pour la rétroaction ; portée et précision de la grammaire, ressources lexicales, développement de sujets, capacité à paraphraser et aisance. 8. Expliquez la règle de grammaire pour toute erreur de grammaire 9. Posez les types de questions suivants ; d'accord ou pas d'accord, 2 choix de préférence, situation hypothétique ('Pensez-vous que c'est une bonne idée ?') S'il vous plaît aidez-moi avec ce qui suit: 1. Configurez un scénario où il s'agit d'une conversation bidirectionnelle. Vous jouerez le rôle de l'examinateur ielts et me poserez des questions 2. Restez dans le scénario sauf si je tape STOP. 3. Demandez-moi mon nom 4. Posez-moi les questions de la partie 1 5. Attendez que je réponde avant de passer à la question suivante 6. Après la partie 1, passez à la partie 2 et fournissez une carte que 7. Après avoir répondu à la partie 2, passez à la partie 3 8. Posez-moi les questions de la partie 3 9. Attendez que je réponde avant de continuer 10. À la fin, donnez-moi des commentaires spécifiques avec des exemples en utilisant les critères suivants ; étendue et précision de la grammaire, ressources lexicales et fluidité. 11. Donnez-moi une note sur 9 en utilisant la version publique de la rubrique orale",
                    img : "08-exam-prep.png",
                    desc : [],
                    active : false
                }
                
            ],
            es : 
            [
                {
                    title : "Cualquier tema",
                    msg : "DIniciar simulacion",
                    prompt : "Tu función es ayudarme a practicar mi español. Hazme preguntas y espera mi respuesta antes de continuar. Haz tus preguntas lo más breves posible. Comienza con esta primera pregunta: 'Estoy aquí para ayudarte a practicar tu español. ¿Qué te gustaría discutir hoy? Podemos hablar de una amplia gama de temas, como historia, negocios, salud y más. ¿Qué te interesa?' asegúrese de comenzar con la pregunta proporcionada y espere una respuesta.",
                    img : '01-all-topics.png',
                    desc : [],
                    active : true
                },
                {
                    title : "Entrevista de trabajo",
                    msg : "Iniciar simulación de entrevista de trabajo",
                    prompt : "Me gustaría practicar mi español a través de una simulación de entrevista de trabajo. Configure un escenario en el que estoy solicitando un trabajo en una empresa y usted me está entrevistando. Espere mi respuesta antes de pasar a la siguiente pregunta, para simular una conversación real en una entrevista de trabajo. Mantenga sus preguntas lo más breves posible. Permanezca en el escenario laboral a menos que escriba STOP. Haga un máximo de 10 preguntas si me desvío del tema, recuérdeme que estoy en una simulación de entrevista de trabajo y si sucede con frecuencia, como si quisiera detenerme. Comienza con el siguiente mensaje: 'Bienvenido a tu entrevista de trabajo. Empecemos. ¿Por favor dime para qué puesto de trabajo estás entrevistando?",
                    img : '02-job-interview.png',
                    desc : [],
                    active : true
                },
                {
                    title : "En el aeropuerto",
                    msg : "Iniciar simulación de check-in en el aeropuerto",
                    prompt : "Me estás ayudando a practicar mi español a través de una simulación de check-in en el aeropuerto. Configure un escenario en el que yo estoy facturando un vuelo en un aeropuerto y usted es el agente de facturación. Espere mi respuesta antes de pasar a la siguiente pregunta, para simular una conversación real. Mantenga sus preguntas lo más breves posible. Permanezca en el escenario del aeropuerto a menos que escriba STOP. Si me desvío del tema, recuérdenme que estoy en una simulación de facturación en el aeropuerto. comience con el siguiente mensaje 'Bienvenido al check-in del aeropuerto. Soy tu agente de check-in. ¿A dónde viajas hoy?",
                    img : "03-at-the-airport.png",
                    desc : [],
                    active : true
                },
                {
                    title : "En la escuela",
                    msg : "Iniciar simulación de recorrido escolar",
                    prompt : "Me estás ayudando a practicar mi español a través de una simulación de recorrido escolar. Soy un estudiante actual que se supone que debo mostrarte los alrededores. eres un nuevo estudiante. Haga preguntas breves y espere mi respuesta antes de hacer la siguiente pregunta para simular una conversación real. Mantenga sus preguntas lo más concisas posible. La simulación debería aplicarse a todos los niveles escolares, desde la primaria hasta la universidad. Mantenga el escenario del recorrido escolar a menos que el usuario escriba 'STOP'. Haga preguntas sobre diferentes aspectos de la escuela, como edificios específicos, clases, servicios, etc. Si me desvío del tema, recuérdeme la simulación del recorrido escolar. Si el usuario se sale del tema dos veces seguidas, pregúntele si quiere continuar con la simulación. Recuerde Esperar mi respuesta antes de pasar a la siguiente pregunta, para simular una conversación real.",
                    img : "04-at-school.png",
                    desc : [],
                    active : false
                },
                {
                    title : "En el restaurante",
                    msg : "Iniciar simulación de restaurante",
                    prompt : "Me estás ayudando a practicar mi español a través de una simulación de restaurante.1. Configure un escenario en el que yo soy cliente de un restaurante y usted será el camarero. 2. Permanezca en el escenario del restaurante a menos que escriba STOP. 3. Haga algunas preguntas para guiarme a través del proceso de pedido. 4. Inicie la simulación compartiendo el escenario y haciendo la primera pregunta. espere una respuesta antes de pasar a la siguiente pregunta, simulando una conversación real sobre pedidos en un restaurante. 5. Si me desvío del tema, recuérdame que estoy en una simulación de pedidos en un restaurante. 6. Si me desvío del tema dos veces seguidas, pregúntame si quiero detener la simulación de pedidos en el restaurante.",
                    img : "05-at-the-restaurant.png",
                    desc : [],
                    active : true
                },
                {
                    title : "Visita al médico",
                    msg : "Iniciar simulación de cita médica",
                    prompt : "Me gustaría practicar mi español mediante una simulación de cita con el médico. Configure un escenario en el que yo sea un paciente en el consultorio de un médico y usted sea el médico o la enfermera. Haga preguntas breves y espere mi respuesta antes de pasar a la siguiente pregunta, para simular una conversación real. Mantenga sus preguntas lo más breves posible. Permanecer en la simulación del consultorio médico a menos que escriba 'STOP'. Si me desvío del tema, recuérdenme que estoy en una simulación de consultorio médico. Asegúrate de esperar mi respuesta antes de pasar a la siguiente pregunta, para simular una conversación real..",
                    img : "06-doctors-visit.png",
                    desc : [],
                    active : true
                },
                {
                    title  : "Registro en el hotel",
                    msg : "Iniciar simulación de check-in en hotel",
                    prompt : "Me gustaría practicar mi español a través de una simulación de check-in en un hotel. Configure un escenario en el que yo me registre en un hotel y usted sea Vicky, la recepcionista del Hotel VTalk. Haga preguntas breves y espere mi respuesta antes de pasar a la siguiente pregunta, para simular una conversación real. Mantenga sus preguntas lo más breves posible. Permanecer en la simulación del hotel a menos que escriba STOP. Si me desvío del tema, recuérdenme que estoy en una simulación de hotel. Comience con el siguiente mensaje 'Bienvenido a Hotel VTalk. ¿Tienes reserva o quieres una habitación?’. Asegúrate de esperar mi respuesta antes de pasar a la siguiente pregunta, para simular una conversación real.",
                    img : "07-hotel-checkin.png",
                    desc : [],
                    active : true
                },
                {
                    title : "Préparation à l'examen",
                    msg : "Démarrer la simulation",
                    prompt : "Demandez à l'utilisateur s'il souhaite pratiquer le TOEL ou l'IELTS S'il répond au TOEFL, utilisez l'invite ci-dessous TOEFL parlant question 1 J'aimerais pratiquer le TOEFL en parlant par simulation. Aidez-moi s'il vous plaît avec ce qui suit : 1. Configurez un scénario dans lequel vous jouez le rôle du narrateur toefl et je jouerai le rôle du candidat 2. Restez dans le scénario à moins que je ne tape STOP. 3. Posez-moi cinq questions orales 1. 4. Attendez que je réponde avant de passer à la question suivante. 5. Après avoir répondu à une question, faites-moi part de vos commentaires avant de passer à la question suivante. 6. Donnez-moi des commentaires spécifiques avec des exemples d'erreurs et apportez des corrections. 7. en utilisant les critères suivants pour la rétroaction ; portée et précision de la grammaire, ressources lexicales, développement de sujets, capacité à paraphraser et aisance. 8. Expliquez la règle de grammaire pour toute erreur de grammaire 9. Posez les types de questions suivants ; d'accord ou pas d'accord, 2 choix de préférence, situation hypothétique ('Pensez-vous que c'est une bonne idée ?') S'il vous plaît aidez-moi avec ce qui suit: 1. Configurez un scénario où il s'agit d'une conversation bidirectionnelle. Vous jouerez le rôle de l'examinateur ielts et me poserez des questions 2. Restez dans le scénario sauf si je tape STOP. 3. Demandez-moi mon nom 4. Posez-moi les questions de la partie 1 5. Attendez que je réponde avant de passer à la question suivante 6. Après la partie 1, passez à la partie 2 et fournissez une carte que 7. Après avoir répondu à la partie 2, passez à la partie 3 8. Posez-moi les questions de la partie 3 9. Attendez que je réponde avant de continuer 10. À la fin, donnez-moi des commentaires spécifiques avec des exemples en utilisant les critères suivants ; étendue et précision de la grammaire, ressources lexicales et fluidité. 11. Donnez-moi une note sur 9 en utilisant la version publique de la rubrique orale",
                    img : "08-exam-prep.png",
                    desc : [],
                    active : false
                }
                
            ]
        }
    }
}

const getDefaultLanguages = () => {
    return         {
        active_lang : 'en',
        active_target : 'fr',
        available :
        [
            {
                 name : 'English',
                 short_name : 'en',
                 status : 'active' 
            },
            {
                 name : 'French',
                 short_name : 'fr',
                 status : 'active'
            },
            {
                name : 'Spanish',
                short_name : 'es',
                status : 'active'
           }
        ]
    }
}

const getOptionsDefault = () => {
    return  [
        {
            id : '01-AI-Speaking-Session',
            name : 'AI Speaking Session',
            icon : '01-certificate',
            path : '/language/ai-speaking',
            active : true
        },
        {
            id : '02-Lessons',
            name : 'Lessons & Pronunciation',
            icon : '02-book-open',
            path : '/language/ai-lessons',
            active : true
        },
        {
            id : '03-Toefl',
            name : 'IELTS/TOEFL',
            icon : '03-toefl-users',
            path : '/exam-prep/option', // - /exam-prep/ai-static/que/part-1
            active : false
        }
    ];
}

const getExamPrepDefault = () => {
    return {
        options : 
        [
            {
                id : '01-examp-prep-option-ielts',
                name : 'IELTS',
                icon : '03-toefl-users',
                active : true
            },
            {
                id : '02-examp-prep-option-toefl',
                name : 'TOEFL',
                icon : '03-toefl-users',
                active : false,
            },
            {
                id : '03-exam-prep-option-toeic',
                name : 'TOEIC',
                icon : '03-toefl-users',
                active : false
            }
        ],
        questions : {
            option_id : null,
            active_test_id : null,
            active_type : null,
            sample_data : { active : false , id : null},
            speech_api_type : null,
            prep_type : { complete : true, count : 0 },
            static  : 
            { 
                setup :
                {
                    current_state : null,
                    interview_done : false,
                    cue_card_done : false,
                    finals_done : false,
                    results_done : false,
                },
                tests:
                [
                    {
                        option_id : '01-examp-prep-option-ielts',
                        data : [
                            {
                                name : 'Events (15 minutes)',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'Are you a student or do you work?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : 'What is your place of work or school like?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'What do you like about your job or school?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : 'Is there anything you don’t like about your job or school?',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'Let’s talk about your home town or village:  What kind of place is it?',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : 'What’s the most interesting part of your town/village?',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'What kind of jobs do the people in your town/village do?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'Would you say it’s a good place to live? (Why?)',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'Let’s move on to talk about accommodation: Tell me about the kind of accommodation you live in?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'How long have you lived there?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'What do you like about living there?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'What sort of accommodation would you most like to live in?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe a special event or festival that you liked.',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "what the event was",
                                        "Where it was",
                                        "What happened and say why you liked it"
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'We have been talking about a special event or festival that you liked . Why do you think celebrations are important in society?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'Do you think celebrations are experienced differently by the different generations?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'Let’s talk now about international events. Do you think International events help to promote cooperation and collaboration between countries?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : 'Do you think international sporting events are more popular with the older or younger generation?',
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : ' Do you think we will see changes in the future to international events? And if so, what sort of changes might we see?',
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses . Minimum 3 words per answer" ,
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : true,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-1'
                            },
                            {
                                name : 'Personal Belongings',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'Do you work or do you study?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : 'How long have you been studying or working?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'Why did you choose this subject or job?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : 'What would you like to do in the future?',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'Let’s talk about free time. Do you have a lot of free time?',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : 'Do you spend your free time outside?',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'What sort of things do you like doing outside ?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'Is there a free time activity you would like to try in the future',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'Let’s talk about animals now. Do you like animals?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'Do you have any animals in your home as a pet?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'Did you have a pet when you were a child?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'Would you like to have a pet in the future?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe something you own which is very important to you.',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "Say What it is",
                                        "How long you have had it",
                                        "Why it is important to you"
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'Let’s consider first of all how people’s values have changed. What kind of things give status to people in your country?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'Why do you think people are so concerned about status?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'Have things changed since your parents’ time?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : 'Do you think they will change in the future?',
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : 'Finally, let’s talk about the role of advertising. Do you think advertising influences what people buy?',
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-06',
                                        q : 'Why do you think celebrities are often used to advertise products?',
                                        q_vid : 'sp3-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-07',
                                        q : 'Is using celebrities to advertise products a negative thing or a positive thing? Why?',
                                        q_vid : 'sp3-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-08',
                                        q : 'Do you think advertising has more influence on children and teenagers than on adults? Why or why not?',
                                        q_vid : 'sp3-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses .",
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : false,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-2'
                            },
                            {
                                name : 'Gift giving',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'Are you a student or do you work?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : 'And what subject do you study? or, what work do you do?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'Why did you choose this subject or job?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : 'What do you hope to do when you finish your studies? or what job would you like to do in the future?',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'What do you usually do at the weekend?',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : 'What do you think you will do next weekend?',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'Do you enjoy your weekends more now than you did when you were a child?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'How important is it for you to relax at the end of the week?',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'What sort of music do you usually enjoy listening to?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'Has the kind of music you like changed over the years?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'Do you prefer listening to live music or recorded music?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'Do you think listening to music helps you study?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe a special gift or present you gave to someone.',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "What it was",
                                        "Who it was for",
                                        "when you gave the gift",
                                        "why it was special"
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'On what occasions do family members give gifts to each other in your country?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'Do people tend to spend a of money on gifts?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'What kind of gifts do children give to adults?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : 'What age do children start to choose to give presents to their parents?',
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : 'How important is giving gifts within families?',
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-06',
                                        q : 'What sort of aid do countries give to other countries?',
                                        q_vid : 'sp3-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses .",
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : false,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-3'
                            },
                            {
                                name : 'Education',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'Lets talk about where you live, do you live in a village, town or city?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : ' How long have you lived there?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'And what is it like... where you live?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : ' Are there many people in the area where you live',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'Now lets talk a little bit about your family; Who are you closest to in your family? Why??',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : 'What kind of activities do you like to do together as a family?',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'How has your family influenced who you are today?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'Do you think families are changing in your country?',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'Ok, now lets talk about travel: Do you enjoy traveling?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'What is your favorite travel destination?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'How do you prefer to travel? Why do you prefer this way of travelling?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'What kind of places do you like to visit when you travel?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe a subject you enjoyed studying at school. You should say',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "what the subject was",
                                        "why you enjoyed it",
                                        "how it has influenced you",
                                        "and explain how it has been useful to you later in life"
                                        
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'Now lets talk a little bit more about education. How do you think education will change in the next 20 years?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'Do you think education always improves over time?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'What can we do to make sure everyone receives a good education in the future?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : 'What role do you think teachers will play in future education systems?',
                            
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : 'Lets talk a little bit about vocational skills. Should society place more value on vocational skills?',
                                        
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-06',
                                        q : 'Do you think everyone should learn a vocational skill in school? Why?',
                                        q_vid : 'sp3-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-07',
                                        q : 'What type of skills are most important to learn?',
                                        q_vid : 'sp3-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses .",
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : false,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-4'
                            },
                            {
                                name : 'Art',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'Lets talk about what you do,are you currently studying or do you have a job?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : ' How much time do you spend studying or working?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'Whats the best thing about your studies or job?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : ' What would you change about it?',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'Now lets talk about food. What type of food do you enjoy eating? ',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : 'Do you prefer dining out or cooking at home? ',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'What type of food do you have when you or someone in your family cooks?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'Is there any food you dont like?',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'Lets move on to talking about exercise. Do you have a regular exercise routine?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'What form of exercise do you prefer?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'How do you think exercise benefits people?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'Do you think people in your country exercise enough?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe an art exhibition or a museum that you have visited. You should say',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "where it was",
                                        "what you saw there",
                                        "how it has influenced you",
                                        "and explain why this visit was memorable to you"
                                        
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'Weve been discussing the topic of art and culture. How important do you think art is in education?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'Should local authorities spend money protecting and promoting art?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'How does art affect the way we view the world?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : ' Why do you think some people dont appreciate art',
                            
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : ' Do you believe that understanding art is necessary for understanding a culture?',
                                        
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-06',
                                        q : 'Is art an important part of your culture?',
                                        q_vid : 'sp3-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-07',
                                        q : 'Do you think art is more important in some cultures than others?',
                                        q_vid : 'sp3-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-08',
                                        q : 'Can art change a culture in any way?',
                                        q_vid : 'sp3-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses .",
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : false,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-5'
                            },
                            {
                                name : 'Travel',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'Whereabouts do you currently live?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : ' Do you like the area that you live in?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'WWhat are the best parts about where you live presently?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : 'Is there anything that you would change about where you live?',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'What are your hobbies? ',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : 'How much time do you spend on your hobbies? ',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'Have your hobbies changed over time?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'Why do you think hobbies are important?',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'What household chores do you often do?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'When do you usually do your chores?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'Do you dislike any chores?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'Has technology changed the way you do household chores?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe a memorable trip you have taken. You should say',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "where you went",
                                        "who you went with",
                                        "what you did there",
                                        "and explain why it was memorable"
                                        
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'How does travel impact global understanding and cooperation?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'Can travel sometimes have a negative impact on global understanding?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'How important is responsible tourism in promoting global understanding and cooperation?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : 'Do you think the rise of virtual reality technology will change the way people travel?',
                            
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : 'What are the limitations of virtual reality in replicating the travel experience?',
                                        
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-06',
                                        q : 'Could virtual reality lead to a decrease in physical travel, benefiting the environment?',
                                        q_vid : 'sp3-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                    
                            
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses .",
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : false,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-6'
                            },
                            {
                                name : 'Exercise',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'What are you doing currently; working or studying?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : ' Do you work or study part time, or full time?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'What kind of work do you do or what subject are you studying?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : 'Is it an interesting job or subject?',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'Do you have a particular fashion style you follow?',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : 'How do you decide what to wear?',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'Has your style changed over the years?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'Do you think its important to follow fashion trends?',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'Do you watch TV regularly?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'What are your favorite TV shows?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'Do you prefer watching TV alone or with others?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'How do you think television has changed in the last decades?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe a time when you started a new exercise routine. You should say',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "what the exercise was",
                                        "why you started it",
                                        "how it has affected your health",
                                        "and explain how you felt about this exercise routine"
                                        
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'How do you think modern lifestyles have affected peoples health and fitness?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'In your opinion, what role do governments play in promoting health and fitness among their citizens?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'Do you think modern work and leisure patterns are more harmful or beneficial to peoples health?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : 'What form of exercise do you prefer?',
                            
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : 'How do you think exercise benefits people?',
                                        
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-06',
                                        q : 'Do you think people in your country exercise enough?',
                                        q_vid : 'sp3-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                    
                            
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses .",
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : false,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-7'
                            },
                            {
                                name : 'Goals',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'Where do you live in your country?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : ' And is it an interesting place to live?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'Do you plan to live there in the future?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : 'Do you live close to your family?',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'What kind of vacations do you like?',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : 'What do you like to do on your vacation?',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'How often do you go on vacation?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'Do you prefer to travel alone or with others?',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'Do you use social media regularly?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'What are the benefits of using social media?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'Do you think there are any negative aspects of social media?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'How do you think social media will evolve in the future?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe a personal goal you have set for yourself recently. You should say',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "What the goal is",
                                        "Why you have chosen this goal",
                                        "what you are doing to achieve it",
                                        "and explain how you will feel once you achieve it"
                                        
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'How important do you think setting goals is for personal development?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'What do you think are the most effective strategies for achieving personal goals?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'Do you think peoples goals change as they get older? Why or why not?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : 'How can failure in achieving a goal affect a person?',
                            
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : 'And what do you think is the best way to deal with it?',
                                        
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-06',
                                        q : 'In your opinion, is it more important to set realistic goals or to aim high and set challenging goals? Why?',
                                        q_vid : 'sp3-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                    
                            
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses .",
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : false,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-8'
                            },
                            {
                                name : 'Hobbies',
                                interview : [
                                    {
                                        id : 'exp-01',
                                        q : 'Could you describe the area where you currently live?',
                                        q_vid : 'sp1-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-02',
                                        q : ' How long have you been living in this area?',
                                        q_vid : 'sp1-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-03',
                                        q : 'What do you like most about living in your area?',
                                        q_vid : 'sp1-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-04',
                                        q : 'Are there any local facilities or amenities that you frequently use?',
                                        q_vid : 'sp1-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-05',
                                        q : 'How often do you use the Internet?',
                                        q_vid : 'sp1-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-06',
                                        q : ' What do you usually do on the Internet?',
                                        q_vid : 'sp1-6',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-07',
                                        q : 'HDo you think you could live without the Internet?',
                                        q_vid : 'sp1-7',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-08',
                                        q : 'Whats your favorite thing about the Internet?',
                                        q_vid : 'sp1-8',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-09',
                                        q : 'How often do you spend time with your friends?',
                                        q_vid : 'sp1-9',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-10',
                                        q : 'What do you like to do when you are with your friends?',
                                        q_vid : 'sp1-10',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-11',
                                        q : 'Do you prefer to have a large group of friends or just a few close ones?',
                                        q_vid : 'sp1-11',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'exp-12',
                                        q : 'What qualities do you think are important in a friend?',
                                        q_vid : 'sp1-12',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                ],
                                cue_card : 
                                {
                                    id : 'cue-1',
                                    q  : 'Describe a hobby or activity you enjoy doing in your leisure time. You should say',
                                    q_vid : 'sp2-1',
                                    message : {
                                        vid : {v1 : 'sp2-2', v2 : 'sp2-3'},
                                        txt : []
                                    },
                                    cues : [
                                        "what the hobby or activity is",
                                        "when and how you got started with it",
                                        "what you like about it",
                                        "and explain why it is important to you"
                                        
                                    ],
                                    ans : null,
                                    audio : null,
                                    timestamp : null,
                                    done : false
                                },
                                finals : [
                                    {
                                        id : 'final-01',
                                        q : 'Why do you think it important for people to have hobbies?',
                                        q_vid : 'sp3-1',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-02',
                                        q : 'What are the most popular hobbies in your country?',
                                        q_vid : 'sp3-2',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-03',
                                        q : 'How can hobbies impact a persons mental health?',
                                        q_vid : 'sp3-3',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-04',
                                        q : 'In what ways have modern lifestyles affected peoples engagement in hobbies?',
                            
                                        q_vid : 'sp3-4',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    },
                                    {
                                        id : 'final-05',
                                        q : 'Do you think the things people choose to do in their free time reflects their personalities? Why or why not',
                                        
                                        q_vid : 'sp3-5',
                                        ans : '',
                                        audio : null,
                                        timestamp : '',
                                        status : false
                                    }
                                    
                            
                                ],
                                protip : {
                                    interview : {
                                       title : 'Individual Long Turn',
                                       sub_title : 'Pro Tip',
                                       img : 'part-1',
                                       desc : [
                                                "Try to extend your answers and avoid short responses .",
                                                "2 sentence responses normally should be sufficient",
                                                "Replay video if you don't hear the question clearly the first time"
                                            ]
                                    },
                                    cue_card : {
                                        title : 'Individual Long Turn',
                                        sub_title : 'Pro Tip',
                                        img : 'part-2',
                                        desc : [
                                            "Try to use a variety of tenses", 
                                            "The past, present and the future where possible",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    },
                                    finals : {
                                        title : 'Express Your Opinion',
                                        sub_title : 'Pro Tip',
                                        img : 'part-3',
                                        desc : [
                                            "Make sure to explain you answers",
                                            "Avoid short responses . Use phrasal verbs",
                                            "Replay video if you don't hear the question clearly the first time"
                                        ]
                                    }
                                },
                                guest : {
                                    active : false,
                                    name : 'Sample Exam'
                                },
                                active : true,
                                video_active : true,
                                speech_api : 'speech-super',
                                img : 'img-9'
                            },
                        ]
                    },
                ]
            },
            dynamic : 
            {
                setup :
                {
                    current_state : null,
                    interview_done : false,
                    cue_card_done : false,
                    finals_done : false,
                    results_done : false,
                },
                tests :
                [
                    {
                        interview : [],
                        cue_card : [],
                        finals : []
                    }
                ]
            },
        },
        cloud : {
            acive : true,
            data : null,
            flow : {
                prep : {
                    id : null,
                },
                exam : {
                    id : null,
                    part : {
                        id : null,
                        data : null
                    }, 
                    question :{
                        last : 0,
                        current : 0,
                        next : 0
                    }
                },
                part_id : null,
            }
        },
        results : 
        {
            chatgpt : 
            {
                interview : {},
                final : {}
            },
            speeachace : 
            {
                interview : [],
                cue_card : [],
                finals : []
            },
            pronunciation : 
            {
                interview : [],
                cue_card : [],
                finals : []
            },
            gpt_score : 
            {
                interview : [],
                cue_card : [],
                finals : []
            }
        }
    }
}

const getExamPrepCloud = () => {
    return {
        id : null,
        active : false,
        name : '',
        data : [],
        exam : {
            id : null,
            data : null,
            part : {
                id : null,
                data : [],
                index : null,
                last : null,
                current : null,
                next : null,
            },
            question : {
                data : [],
                last : null,
                current : null,
                next : null
            },
            type : {
                complete : true,
                count : 0,
                restrict : false
            }
        }
    }
}

const getTestSyncDefault = () => {
    return {}
}

const getDefaultSetup = () => {
    return {
        ielts : {
            done : {
                intro : false,
                audio : false,
                mic : false
            },
            audio : {
                obj : null,
            }
        }
    }
}

const getDefaultState = () => {  
    return {
        build : getBuildHandler(),
        setup : getDefaultSetup(),
        guide : getGuideDefaultState(),
        User : getUserDefaultSate(),
        test_sync : getTestSyncDefault(),
        speaking_setup : getSpeakingSetupDefState(),    
        ai_speaking : getAiSpeakingDefState(),
        languages : getDefaultLanguages(),
        options : getOptionsDefault(),
        exam_prep : getExamPrepDefault(),
        prep : getExamPrepCloud()
    }
}


export default  createStore({
        
    state () 
    {
        return getDefaultState();
    },

    mutations : 
    {
        UPDATE_PHRASE(state, data)
        {
            var lessons = state.lessons[state.languages.active_lang];

            for(var i=0; i<lessons.length; i++)
            {
                if(lessons[i].id==data.lesson_id)
                {
                    var phrases = lessons[i].phrases

                    for(var j=0; j<phrases.length; j++)
                    {
                        if(j==data.phrase_id)
                        {
                            phrases[j].status = 'done'
                        }
                    }
                }
            }
        },

        SET_CATEGORY(state, data)
        {
            state.ai_speaking.presets.active = data;
        },

        UPDATE_EXAM_PREP_OPTION(state, data)
        {
            state.exam_prep.questions.option_id  =  data.option_id;
            state.exam_prep.questions.active_type =  data.active_type;
        },

        UPDATE_EXAM_PREP_SUB_OPTION(state, data)
        {
            state.exam_prep.questions.active_test_id = data.id;
            state.exam_prep.questions.speech_api_type = data.api;
            state.exam_prep.questions.sample_data = data.sample_data;
        },

        UPDATE_EXAM_PREP(state, data)
        {
            state.exam_prep = data;
        },

        UPDATE_PREP_TYPE(state, data)
        {
            state.exam_prep.questions.prep_type.complete = data.complete;
            state.exam_prep.questions.prep_type.count = data.count;
        },

        SET_USER(state, data)
        {
            state.User = data;
        },

        RESET(state)
        {
            Object.assign(state, { User :  getUserDefaultSate() });
            Object.assign(state, { exam_prep : getExamPrepDefault() });
        },

        RESET_EXAM_PREP(state)
        {
           Object.assign(state, { exam_prep : getExamPrepDefault() });
           Object.assign(state, { test_sync : getTestSyncDefault() });
        },

        UPDATE_PRODUCT_GUIDE(state, data)
        {
            switch(data.type)
            {
                case 'conversation' : 
                    state.guide.exam_prep.ielts.is_conversation_done.status  = data.status;
                    state.guide.exam_prep.ielts.is_conversation_done.trigger = data.trigger;
                break;
                case 'cue_card' : 
                    state.guide.exam_prep.ielts.is_cue_card_done.status  = data.status;
                    state.guide.exam_prep.ielts.is_cue_card_done.trigger = data.trigger; 
                break; 
            }
        },

        UPDATE_SETUP(state, data)
        {
            switch(data.type)
            {
                case 'intro': state.setup.ielts.done.intro = data.status; break;
                case 'audio': state.setup.ielts.done.audio = data.status; break;
                case 'mic'  : state.setup.ielts.done.mic   = data.status; break;
                case 'save' : state.setup.ielts.audio.obj  = data.obj;    break;
            }
        },

        CLEAR_LOCAL_STORAGE(state)
        {
            Object.assign(state, getDefaultState());
            localStorage.clear();
        },

        BUILD(state, data)
        {
            state.build.number = data.number;
            state.build.instruct = data.instruct;
            state.build.success = data.success;
        },

        PREP_RESET(state)
        {
            Object.assign(state, { prep : getExamPrepCloud() });
        },

        PREP_SETUP(state, prep)
        {
            state.prep.id = prep.id;
            state.prep.data = prep.data;
            state.prep.name = prep.name;
        },

        PREP_EXAM_UPDATE(state, data)
        {
            state.prep.exam.id = data.id;
            state.prep.exam.data = data;
            state.prep.exam.part.data = data.guide;
            state.prep.exam.question = data.question;
        },

        PREP_TYPE_COMPLETE(state, data)
        {
            state.prep.exam.type.complete = data.complete;
            state.prep.exam.type.count = data.count;
            state.prep.exam.type.restrict = data.restrict;
            state.prep.exam.part.id = data.part.id;
            state.prep.exam.part.index = data.part.index;   
        },

        PREP_UPDATE_PART(state, data)
        {
            state.prep.exam.question.questions = data.question;
            state.prep.exam.part.id = data.part.id;
            state.prep.exam.part.index = data.part.index;
        },

        /**
         * Refined Mutations
         * 
         * @description : N?A  
         */
        SET_LANG(state, data)
        {
            var temp_lang = state.languages.available;

            for(var i=0; i<temp_lang.length; i++)
            {
                if(temp_lang[i].short_name==data.lang)
                {
                   if(data.type=='source')
                   {
                     state.languages.active_lang = data.lang;
                   }

                   if(data.type=='target')
                   {
                     state.languages.active_target = data.lang;
                   }
                }
            }
        },

        UPDATE_TEST_SYNC(state, data)
        {
            state.test_sync = data
        }, 
    },

    actions : 
    {
        UpdatePhraseStatus({ commit }, data)
        {
            commit("UPDATE_PHRASE", data);
        },

        SetCategory({ commit }, category)
        {
            commit("SET_CATEGORY", category);
        },

        UpdateExamPrepOption({ commit }, data)
        {
            commit("UPDATE_EXAM_PREP_OPTION", data);
        },

        UpdateExamPrepSubOption({ commit }, data)
        {
            commit("UPDATE_EXAM_PREP_SUB_OPTION", data)
        },

        UpdateExamPrepData({ commit }, data)
        {
            commit("UPDATE_EXAM_PREP", data);
        },

        UpdatePrepType({ commit }, data)
        {
            commit("UPDATE_PREP_TYPE", data);
        },

        Login({ commit }, data)
        {
            commit("SET_USER", data);
        },

        Logout({ commit })
        {
            commit("RESET", "");
        },

        ResetExamPrep({ commit })
        {
            commit("RESET_EXAM_PREP", )
        },

        UpdateProductGuide({ commit }, data)
        {
            commit("UPDATE_PRODUCT_GUIDE", data);
        },

        UpdateSetup({ commit }, data)
        {
            commit("UPDATE_SETUP", data);
        },

        ClearLocalStorage({ commit })
        {
            commit("CLEAR_LOCAL_STORAGE", "");
        },

        RunBuild({ commit }, data)
        {
            commit('BUILD', data);
        },

        ResetPrep({ commit })
        {
            commit("PREP_RESET");
        },
        
        SetupPrep({ commit }, data)
        {
            commit("PREP_SETUP", data);
        },

        UpdatePrepExam({ commit }, data)
        {
            commit("PREP_EXAM_UPDATE", data);
        },

        UpdatePrepTypeComplete({ commit }, data)
        {
            commit("PREP_TYPE_COMPLETE", data);
        },

        UpdatePrepPart({ commit }, data)
        {
            commit("PREP_UPDATE_PART", data)
        },

        /**
         * Refined ACtions
         * 
         * @description : N/A
         */
        SetDefaultLang({ commit }, data)
        {
            commit("SET_LANG", data);
        },

        UpdateTestSync({ commit }, data)
        {
            commit("UPDATE_TEST_SYNC", data);
        },
    },

    getters : 
    {
        GetProdGuideIeltsConv : state => {
            return state.guide.exam_prep.ielts.is_conversation_done
        },
        
        GetProdGuideIeltsCue : state => {
            return state.guide.exam_prep.ielts.is_cue_card_done
        },

        GetBuild : state => {
            return state.build;
        },

        /**
         * Refined Getters
         *  
         * @description : N/A
         */
        GetData : state => {
            return state;
        },

        GetUser: state => 
        {
            return state.User;
        },

        IsLoggedIn : state => 
        {
            return state.User.token;
        },
        
    },

    plugins: [vuexPersist.plugin]
});