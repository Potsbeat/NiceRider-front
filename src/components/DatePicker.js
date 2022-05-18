import { useEffect, useState } from "react";

function DatePicker({setDate}) {

    const months = [{
        
          "name": "enero",
          "short": "ene",
          "number": "01",
          "days": 31
        },{
       
          "name": "febrero",
          "short": "feb",
          "number": "02",
          "days": 28
        },{
       
          "name": "marzo",
          "short": "mar",
          "number": "03",
          "days": 31
        },{
       
          "name": "abril",
          "short": "abr",
          "number": "04",
          "days": 30
        },{
       
          "name": "mayo",
          "short": "may",
          "number": "05",
          "days": 31
        },{
        
          "name": "junio",
          "short": "jun",
          "number": "06",
          "days": 30
        },{
       
          "name": "julio",
          "short": "jul",
          "number": "07",
          "days": 31
        },{
       
          "name": "agosto",
          "short": "ago",
          "number": "08",
          "days": 31
        },{
        
          "name": "septiembre",
          "short": "sep",
          "number": "09",
          "days": 30
        },{
        
          "name": "octubre",
          "short": "oct",
          "number": 10,
          "days": 31
        },{
        
          "name": "noviembre",
          "short": "nov",
          "number": 11,
          "days": 30
        },{
        
          "name": "diciembre",
          "short": "dic",
          "number": 12,
          "days": 31
        }
      ];

      const classes = "bg-white shadow-md shadow-slate-300 outline-none rounded-md px-2 py-1 font-roboto font-light";
    
      const [day, setDay] = useState('1');
      const [month, setMonth] = useState('01')
      const [year, setYear] = useState('1930');

      function getYearsArray() {
          const startingYear = 1930;
          const currentYear = new Date().getFullYear();

          let yearsArr = Array((currentYear - startingYear + 1));

          for(let i=0; i<yearsArr.length; i++){
              yearsArr[i] = startingYear + i;
          }

          return yearsArr;
      }
    
useEffect(()=>{
    setDate(`${year}-${month}-${day<10 ? '0'+day : day}`)
},[day,month,year])

    return (
        <div className="flex justify-center gap-1 w-full ">
            <select name="days" onChange={e=>setDay(e.target.value)} value={day} className={classes}>
                {  Array( months.filter( (mnt) => (
                    
                    mnt.number == month
                    
                ) )[0].days).fill(0).map((e,index) => (<option key={index} value={index+1}>{index+1}</option>))  }
            </select>

            <select name="months" onChange={e=>setMonth(e.target.value)} value={month} className={classes}>
                { months.map( (mnt, index) => (
                    
                    <option key={index} value={mnt.number}>{mnt.short} </option>
                    
                ) ) }
            </select>

            <select name="years" onChange={e=>setYear(e.target.value)} value={year} className={classes}>
                    {getYearsArray().map( (e, index) => <option key={index} value={e}>{e}</option> )}
            </select>

        </div>
    );
}
/*
const Select = ({}) => (

)*/

export default DatePicker;