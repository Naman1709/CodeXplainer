import Heading from "../Heading"
import CodeExplainForm from './../forms/CodeExplainForm';

const CodeEntry = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
        <Heading />
        <CodeExplainForm />
    </div>
  )
}

export default CodeEntry