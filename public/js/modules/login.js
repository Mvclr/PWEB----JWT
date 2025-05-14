  
  
  async function message() {
  const msgElement = document.querySelector(".msg-js");

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      const data = await response.json();
      
    } else {
      const errorData = await response.json();
      msgElement.innerHTML = errorData.message; // Display the error message
    }
  } catch (error) {
    console.error("Error during login:", error);
    msgElement.innerHTML = "Erro ao tentar fazer login. Tente novamente.";
  }
};
 

