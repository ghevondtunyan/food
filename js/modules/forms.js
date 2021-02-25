//Forms

const forms = function () {
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "load",
    success: "Tahnks! Soon we will coll you",
    failure: "Somethig went worong",
  };
  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          statusMessage.textContent = message.success;

          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          form.reset();
        });
    });
  }
};
export default forms;
