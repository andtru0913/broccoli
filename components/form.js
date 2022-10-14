export default function Form() {
    return (
        <>
            <div className="flex flex-col">
                <div className=" w-full bg-violet-900  p-12">

                    {/**title */}

                    <div className="relative flex  flex-row border-2 ">

                        <div className="flex-1 bg-salmone p-12">
                            <p>title</p>
                        </div>

                    </div>

                    {/**first and last name */}
                    <div className="relative flex  flex-col md:flex-row border-2 ">

                        <div className="flex-1 bg-violet-200 p-12">
                            <p>first name</p>
                        </div>
                        <div className="flex-1 bg-violet-300 p-12">
                            <p>last name</p>
                        </div>

                    </div>
                    {/**mail and phone*/}
                    <div className="relative flex flex-col md:flex-row border-2 ">

                        <div className="flex-1 bg-violet-400 p-12">
                            <p>mail</p>
                        </div>
                        <div className="flex-1 bg-violet-500 p-12">
                            <p>phone</p>
                        </div>

                    </div>

                    {/**free text */}
                    <div className="relative flex flex-col md:flex-row border-2 ">

                        <div className="flex-1 bg-violet-600 p-12">
                            <p>free text</p>
                        </div>

                    </div>

                    {/**attatchment */}

                    <div className="relative flex  flex-row border-2 ">

                        <div className="flex-1 bg-violet-700 p-12">
                            <p>insert attachement</p>
                        </div>

                    </div>
                    {/**submit */}

                    <div className="relative flex justify-end flex-row border-2 ">

                        <div className=" bg-limone p-12 ">
                            <p>submit</p>
                        </div>

                    </div>

                </div>

                <form action="/api/form" method="post" className="">




                    <label htmlFor="first">First Name</label>
                    <input type="text" id="first" name="first" required />

                    <label htmlFor="last">Last Name</label>
                    <input type="text" id="last" name="last" required />

                    <button type="submit">Submit</button>

                </form>


            </div>

        </>

    )
}