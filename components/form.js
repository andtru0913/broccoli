export default function Form({ title }) {
  return (
    <>
      <div className="flex flex-col">
        <div className=" w-full  md:p-12">
          {/**title */}

          <div className="relative flex  flex-row ">
            <div className="flex-1 p-2 text-2xl">
              <p>{title}</p>
            </div>
          </div>

          {/**first and last name */}
          <div className="relative flex flex-wrap flex-col md:flex-row  ">
            <div className="flex flex-1 flex-col p-2">
              <label className="text-sm pb-1" htmlFor="first">
                First Name
              </label>
              <input
                className="  p-2 border  appearance-none  rounded-md  shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-secondary autofill:bg-primary-1 autofill:focus:bg-primary-1"
                type="text"
                id="first"
                name="first"
                placeholder="Firstname.. "
                required
              />
            </div>
            <div className="flex flex-1 flex-col p-2">
              <label className="text-sm pb-1" htmlFor="last">
                Last Name
              </label>
              <input
                className="  p-2 border appearance-none  rounded-md shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-secondary "
                autoComplete="on"
                type="text"
                id="last"
                name="last"
                placeholder="Lastname.. "
                required
              />
            </div>
          </div>
          {/**mail and phone*/}
          <div className="relative flex flex-wrap flex-col md:flex-row  ">
            <div className="flex flex-1 flex-col p-2">
              <label className="text-sm pb-1" htmlFor="first">
                Mail
              </label>
              <input
                className="  p-2 border    appearance-none  rounded-md shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-secondary"
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com "
                required
              />
            </div>
            <div className="flex flex-1 flex-col p-2">
              <label className="text-sm pb-1" htmlFor="last">
                Phone
              </label>
              <input
                className="  p-2 border appearance-none  rounded-md shadow leading-tight focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-secondary"
                type="tel"
                id="phone"
                name="phone"
                placeholder="07xxxxxxxx "
                required
              />
            </div>
          </div>

          {/**free text */}
          <div className="relative flex flex-wrap flex-col md:flex-row">
            <div className="flex flex-1 flex-col p-2">
              <label className="text-sm pb-1" htmlFor="first">
                Free text
              </label>
              <textarea
                className="  p-2 border  zinc-200  appearance-none  rounded-md shadow leading-tight text-wrap focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-secondary"
                type="text"
                id="freetext"
                name="freetext"
                placeholder="Tell us something about yourself.. "
              />
            </div>
          </div>

          {/**attatchment */}

          <div className="relative flex flex-wrap flex-row  ">
            <div className="flex flex-1 flex-col p-2">
              <label className="text-sm pb-1" htmlFor="first">
                Insert attachement (CV or/and personal letter)
              </label>
              <input style={{ display: "none" }} id="base64" name="base64" />
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-muted  bg-clip-padding  solid  border rounded transition ease-in-out m-0 focus:text-muted focus:bg-fill focus:outline-secondary focus:outline-none"
                type="file"
                id="formFile"
                name="file"
                onChange={async function () {
                  let submit = document.getElementById("formSubmit");
                  submit.disabled = true;
                  const convertBase64 = (file) => {
                    return new Promise((resolve, reject) => {
                      const fileReader = new FileReader();
                      fileReader.readAsDataURL(file);

                      fileReader.onload = () => {
                        resolve(fileReader.result);
                      };

                      fileReader.onerror = (error) => {
                        reject(error);
                      };
                    });
                  };
                  const f = document.querySelector("#formFile").files[0];
                  document.getElementById("base64").value = await convertBase64(
                    f
                  );
                  submit.disabled = false;
                }}
              />
            </div>
          </div>
          {/**attatchment */}

          <div className="relative flex flex-wrap flex-row  ">
            <div className="flex flex-1 flex-row p-2">
              <label className="text-xs pb-1" htmlFor="first">
                By sending this form you accept your data to be saved
              </label>
            </div>
          </div>
          {/**submit */}

          <div className="relative flex justify-end flex-row  ">
            <div className=" p-2 ">
              <button
                id="formSubmit"
                type="submit"
                className="shadow bg-primary-1 hover:bg-primary-d2 focus:shadow-outline focus:outline-none text-inverted font-semibold py-2 px-4 rounded"
              >
                Skicka
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
