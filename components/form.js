export default function Form({ title }) {
  return (
    <>
      <div className="  flex flex-col ">
        <div className=" w-full  md:p-12">
          {/**title */}

          <div className="relative flex  flex-row ">
            <div className="flex-1 flex justify-center md:justify-start  p-2 text-2xl">
              <p
                id="linkForm"
                className=" pt-12 flex self-center md:self-auto uppercase"
              >
                {title}
              </p>
            </div>
          </div>

          {/**first and last name */}
          <div className="relative flex flex-wrap flex-col md:flex-row ">
            <div className="flex flex-1 flex-col p-2">
              <label className="text-base pb-1" htmlFor="first">
                Förnamn
              </label>
              <input
                className=" text-sm p-2 border border-slate-900 appearance-none  leading-tight hover:border-dashed autofill:bg-primary-1 autofill:focus:bg-primary-1"
                type="text"
                id="first"
                name="first"
                placeholder="Förnamn..."
                required
              />
            </div>
            <div className="flex flex-1 flex-col p-2">
              <label className="text-base pb-1" htmlFor="last">
                Efternamn
              </label>
              <input
                className="text-sm p-2 border  border-slate-900 appearance-none  leading-tight focus:border-dashed hover:border-dashed  "
                autoComplete="on"
                type="text"
                id="last"
                name="last"
                placeholder="Efternamn..."
                required
              />
            </div>
          </div>
          {/**mail and phone*/}
          <div className="relative flex flex-wrap flex-col md:flex-row  ">
            <div className="flex flex-1 flex-col p-2">
              <label className="text-base pb-1" htmlFor="first">
                E-post
              </label>
              <input
                className=" text-sm p-2 border  border-slate-900 appearance-none  leading-tight focus:border-dashed hover:border-dashed "
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com "
                required
              />
            </div>
            <div className="flex flex-1 flex-col p-2">
              <label className="text-base pb-1" htmlFor="last">
                Telefonnummer
              </label>
              <input
                className=" text-sm p-2 border border-slate-900 aappearance-none  leading-tight focus:border-dashed hover:border-dashed"
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
              <label className="text-base pb-1" htmlFor="first">
                Egen text
              </label>
              <textarea
                className=" text-sm p-2 border  border-slate-900  appearance-none leading-tight text-wrap focus:border-dashed hover:border-dashed"
                type="text"
                id="freetext"
                name="freetext"
                placeholder="Berätta något om dig själv! :)"
              />
            </div>
          </div>

          {/**attatchment */}

          <div className="relative flex flex-wrap flex-row  ">
            <div className="flex flex-1 flex-col p-2">
              <label className="text-base pb-1" htmlFor="first">
                Infoga fil (CV och/eller personligt brev)
              </label>
              <input style={{ display: "none" }} id="base64" name="base64" />

              <input
                className="form-control block px-3 py-1.5 text-base font-normal text-muted  solid  border  border-slate-900 focus:text-muted focus:border-dashed hover:border-dashed"
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
              <label className="text-xs pb-1 text-muted" htmlFor="first">
                Genom att skicka in detta formulär godkännder du att dina
                uppgifter sparas
              </label>
            </div>
          </div>
          {/**submit */}

          <div className="relative flex justify-end flex-row z-20   ">
            <div className=" p-2 ">
              <button
                id="formSubmit"
                type="submit"
                className=" btn btn-primary "
              >
                Skicka in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
