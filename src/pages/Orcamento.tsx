import { BudgetForm } from "@/components/budget/BudgetForm";

export default function Orcamento() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Solicite um Orçamento</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Preencha o formulário abaixo com os detalhes do seu projeto e entraremos em contato para discutir as melhores soluções.
        </p>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <BudgetForm />
        </div>
      </div>
    </div>
  );
}