import { useState } from "react";
import "./App.css"
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const App = () => {

  //지출항목 변경
  const [charge, setCharge] = useState("");
  
  //예산목록 수정을 위한 id 변경
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false)

  //비용 변경
  const [amount, setAmount] = useState("");

  //알럿 변경
  const [alert, setAlert] = useState({show:false});

  //기본 예산 목록
  const [expenses, setExpenses] = useState([
    {id: 1, charge: "렌트비", amount: 2000},
    {id: 2, charge: "교통비", amount: 400},
    {id: 3, charge: "식비", amount: 1600} 
  ])


  const handleCharge = (e) => {
    setCharge(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber)
  }

   //알럿 메시지 함수
   const hadndleAlert = ({type, text}) => {
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show:false});
    }, 7000);
  } 

  //목록 수정 버튼 클릭시 지출항목, 비용에 해당 내용 추가됨.
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const {charge, amount} = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }
  // 목록 삭제 함수
  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => 
      expense.id !== id  // 클릭한 아이디를 제외하고 목록 세팅
    )
    setExpenses(newExpenses)

    //알럿메시지 문구
    hadndleAlert({type: "danger", text:"아이템이 삭제되었습니다."})
  }

 // 제출 버튼 클릭시 목록에 항목 추가 되는 함수
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(charge !=="" && amount > 0){
      // 수정 버튼 클릭시 
      if(edit){
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpenses(newExpenses);
        setEdit(false)

        //알럿메시지 문주
        hadndleAlert({type: "success", text:"아이템이 수정되었습니다."})
      } else{
        const newExpense = {id : crypto.randomUUID(), charge, amount}
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        //알럿메시지 문구
        hadndleAlert({type: "success", text:"아이템이 생성되었습니다."})
      }
      // 목록 추가 후 지출 항목 초기화
      setCharge("");
      setAmount("");     
    } else {
      console.log('error')

      //알럿메시지 문구
      hadndleAlert({type: "danger", text:"charge는 빈값일 수 없으면 amount 0보다 커야 합니다."})
    }
  }

  //목록 지우기 버튼 눌렀을 때 목록 전체 지워지는 함수
  const clearItems = () => {
    setExpenses([]);
  }

    return (
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
        <h1>예산 계산기</h1>
        <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}className="">
           <ExpenseForm
              charge={charge}
              handleCharge={handleCharge}
              amount={amount}
              handleAmount={handleAmount}
              handleSubmit={handleSubmit}
              edit={edit}
              />
        </div>
        <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}className="">
           <ExpenseList
              expenses={expenses}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              clearItems={clearItems}
          />
        </div>
        <div style={{display:'flex', justifyContent:'end', marginTop: '1rem'}}>
          <p style={{fontSize:'1rem'}}>
            총지출:
            <span>
              {expenses.reduce((acc, curr) => {
                return (acc += curr.amount)
              }, 0)}
              원
            </span>
          </p>
        </div>
      </main>
    )
}
export default App;