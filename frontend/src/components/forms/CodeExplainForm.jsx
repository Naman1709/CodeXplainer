import { languages } from "../../constants";
import { useActionState } from "react";
import { explain } from "../../Actions";
import { Spinner } from "../LoadingSpinners/LoadingSpinner1";
import CodeExplanationResult from "../CodeExplanation/CodeExplanationResult";
import CodeExplanationError from "../CodeExplanation/CodeExplanationError";
import { useState } from "react";

const CodeExplainForm = () => {
    const [formState, formAction, isPending] = useActionState(explain, null)

    // Use React state to control form fields so they don't reset after submit
    const [language, setLanguage] = useState(languages[0].value);
    const [code, setCode] = useState("");

    return (
        <div className="w-full max-w-4xl bg- p-6 rounded-lg shadow-md">
            <form action={formAction}>
                <label className="block mb-2 font-semibold">Language</label>
                <select
                    name="language"
                    className="border rounded-2xl p-2 w-full mb-4 bg-transparent mt-4"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                >
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.name}
                        </option>
                    ))}
                </select>

                <label className="block mb-2 font-semibold">Code:-</label>
                <textarea
                    name="code"
                    required
                    placeholder="Paste your code here..."
                    className="w-full h-64 p-3 border rounded-2xl bg-transparent resize-none mb-4"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-amber-100 text-amber-900 mt-2 px-6 py-2 rounded-2xl hover:bg-amber-300 transition-colors cursor-pointer w-52 h-12 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isPending}
                >
                    Explain Code
                </button>
            </form>

            {
                isPending
                    ? <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
                        <Spinner message="Processing" />
                    </div>
                    : formState?.success
                        ? <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg whitespace-pre-wrap">
                            <CodeExplanationResult data={formState?.data?.data?.data} />
                        </div>
                        : formState?.error
                            ? <CodeExplanationError error={formState?.error} />
                            : null
            }
        </div>
    );
}

export default CodeExplainForm;