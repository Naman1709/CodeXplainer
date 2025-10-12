"use server"

export async function explain (prevState, formData) {
    const code = formData.get("code");
    const language = formData.get("language");

    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/explaincode`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ code, language }),
        })
        const data = await res.json();
        console.log("res: ", data)
;
        if(!res.ok){
            return { success: false, error: "Something went wrong" }
        }


        return { success: true, data: data }
    } catch (error) {
        console.error("Error in explain action: ", error);
        return { success: false, error: "Something went wrong" }
    }
}