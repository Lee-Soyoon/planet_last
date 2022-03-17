import React, {  useState} from 'react';
import SelectTypeStyle from './SelectType.module.css';
import { Link } from 'react-router-dom';
import IncomeStyle from '../../pages/Floating/Float.module.css';


function SelectExpendType() {
        
        const [filter, setFilter] = useState('');
        const [show1, setShow1] = useState(false);

        function handleButton(value) {
                setFilter(value);
                console.log(value);
                setShow1(show1 => !show1);
                console.log(show1);
        }

        const arr = ["카드", "은행", "현금"];
        const arr2 = ["💳", "🏦", "💵"]; //&#128179; , &#127974; ,&#128181;
        

                return(
                <section className={SelectTypeStyle.type}>
                    {arr.map((value,idx)=> {
                            return (
                            <button key={idx}  
                                className={filter===value &&show1?SelectTypeStyle.type_box_clicked:SelectTypeStyle.type_box}
                                onClick={()=>handleButton(value)}>
                                <p>{arr2[idx]}</p>
                                <div className={SelectTypeStyle.type_box_text}>
                                {value}
                                </div> 
                            </button>
                            )
                    })}

                    <div className={SelectTypeStyle.bottomBtn3}>
                        <button className={IncomeStyle.bottomBtnDisabled}>뒤로</button>
                        <Link to="/ExpendCategory">
                        <button disabled={filter === ''?true:false} className={IncomeStyle.bottomBtnActive}>다음</button>
                        </Link>
                    </div>
            </section>
        );
    
}

export default SelectExpendType;

