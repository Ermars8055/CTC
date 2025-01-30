import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTPMom-M_3DZ4MxvjsY6x5FC0YyNWZZA4",
  authDomain: "kids-8fb10.firebaseapp.com",
  projectId: "kids-8fb10",
  storageBucket: "kids-8fb10.firebasestorage.app",
  messagingSenderId: "396886109573",
  appId: "1:396886109573:web:ecd99fbef13614d8c7a8ec",
  measurementId: "G-4ML36HHESG"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();

interface Message {
  text: string;
  timestamp: number;
  user: string;
  photoURL: string;
}

const ClubDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [announcements] = useState<string[]>([
    "Welcome to the club!",
    "Don't miss our upcoming event this weekend!",
  ]);
  const [events] = useState<{ title: string; date: string }[]>([
    { title: "Hackathon 2025", date: "February 10, 2025" },
    { title: "Annual Meetup", date: "March 15, 2025" },
  ]);
  const [resources] = useState<{ name: string; link: string }[]>([
    { name: "React Documentation", link: "https://reactjs.org" },
    { name: "Firebase Docs", link: "https://firebase.google.com/docs" },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Messages from Firebase: ", data); // Log the data from Firebase
      const chatMessages: Message[] = data
        ? Object.values(data as { [key: string]: Message }).sort(
            (a, b) => a.timestamp - b.timestamp
          )
        : [];
      setMessages(chatMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      text: newMessage,
      timestamp: serverTimestamp(),
      user: user.displayName,
      photoURL: user.photoURL,
    })
      .then(() => {
        console.log("Message sent to Firebase successfully!"); // Log success
      })
      .catch((error) => {
        console.error("Error sending message to Firebase: ", error); // Log any errors
      });

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Club Dashboard</h1>
        {user ? (
          <div className="flex items-center space-x-4">
            <img
              src={user.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span>{user.displayName}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-4 py-2 rounded-lg text-white"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-green-500 px-4 py-2 rounded-lg text-white"
          >
            Sign In with Google
          </button>
        )}
      </header>

      <main className="mt-6 space-y-6">
        {/* Announcements Section */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Announcements</h2>
          <ul className="mt-2 space-y-2">
            {announcements.map((announcement, index) => (
              <li key={index} className="text-gray-700">
                {announcement}
              </li>
            ))}
          </ul>
        </section>

        {/* Events Section */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Events</h2>
          <ul className="mt-2 space-y-2">
            {events.map((event, index) => (
              <li key={index} className="text-gray-700">
                <strong>{event.title}</strong> - {event.date}
              </li>
            ))}
          </ul>
        </section>

        {/* Resources Section */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Resources</h2>
          <ul className="mt-2 space-y-2">
            {resources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Discussion Chat Section */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Discussion Chat</h2>
          <div className="max-h-64 overflow-y-auto border p-2 mt-2 bg-gray-50 rounded-lg">
            {messages.map((message, index) => (
              <div key={index} className="flex items-start space-x-2 mb-4">
                <img
                  src={message.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{message.user}</p>
                  <p className="text-gray-700">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          {user ? (
            <div className="flex items-center mt-4 space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 border rounded-lg"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 px-4 py-2 rounded-lg text-white"
              >
                Send
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">
              Sign in to participate in the chat.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ClubDashboard;
