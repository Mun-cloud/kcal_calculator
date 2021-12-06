// 데이터 array 생성
let data = [];
let totalDt = { cal: 0, car: 0, pro: 0, fat: 0 };

// Ajax 데이터 GET
function getData() {
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const keyId = "c09140f5457543ac8a6a";

  const url = `http://openapi.foodsafetykorea.go.kr/api/${keyId}/I2790/json/1/20/DESC_KOR=${query}`;

  xhr.onreadystatechange = (e) => {
    const { target } = e;

    if (target.readyState == XMLHttpRequest.DONE) {
      if (target.status == 200) {
        // 검색후 도출되는 데이터 변수 정의
        const req = JSON.parse(target.response).I2790.row;

        // ajax에서 필요한 정보만 json으로 묶어 data로 push
        req.map((v, i) => {
          let dt = {};
          dt.cd = v.FOOD_CD;
          dt.name = v.DESC_KOR;
          dt.serving = v.SERVING_SIZE;
          dt.cal = v.NUTR_CONT1;
          dt.car = v.NUTR_CONT2;
          dt.pro = v.NUTR_CONT3;
          dt.fat = v.NUTR_CONT3;
          data.push(dt);
        });

        // 도출된 data 기반 HTML 출력 기능
        printData();
      } else {
        const s = parseInt(target.status / 100);
        let errMsg = null;

        if (s == 4) {
          errMsg = `[${target.status}] ${target.statusText} - 요청 주소가 잘못되었습니다.`;
        } else if (s == 5) {
          errMsg = `[${target.status}] ${target.statusText} - 서버의 응답이 없습니다.`;
        } else {
          errMsg = `[${target.status}] ${target.statusText} - 요청에 실패했습니다.`;
        }
        alert(errMsg);
      }
    }
  };
  xhr.open(method, url);
  xhr.send();
}

// 데이터 출력
function printData() {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  data.map((v, i) => {
    // 생성할 요소들 정의
    const li = document.createElement("li");
    const dep1 = document.createElement("div");
    const dep2 = document.createElement("div");

    dep1.setAttribute("id", "dep1");
    // 식품 이름
    const foodName = document.createElement("h2");
    foodName.setAttribute("class", "food_name");
    foodName.textContent = v.name;

    // 1인분
    const span1 = document.createElement("span");
    span1.setAttribute("class", "print_data");
    span1.textContent = "1인분";
    const serving = document.createElement("span");
    serving.textContent = v.serving;
    span1.appendChild(serving);

    // 열량
    const span2 = document.createElement("span");
    span2.setAttribute("class", "print_data");
    span2.textContent = "열량(kcal)";
    const cal = document.createElement("span");
    cal.textContent = v.cal;
    span2.appendChild(cal);

    //   탄수화물
    const span3 = document.createElement("span");
    span3.setAttribute("class", "print_data");
    span3.textContent = "탄수화물(g)";
    const car = document.createElement("span");
    car.textContent = v.car;
    span3.appendChild(car);

    //   단백질
    const span4 = document.createElement("span");
    span4.setAttribute("class", "print_data");
    span4.textContent = "단백질(g)";
    const pro = document.createElement("span");
    pro.textContent = v.pro;
    span4.appendChild(pro);

    //   지방
    const span5 = document.createElement("span");
    span5.setAttribute("class", "print_data");
    span5.textContent = "지방(g)";
    const fat = document.createElement("span");
    fat.textContent = v.fat;
    span5.appendChild(fat);

    //   꺽쇠
    const chev = document.createElement("span");
    chev.setAttribute("class", "chev");
    chev.textContent = "<";

    dep1.append(foodName, span1, span2, span3, span4, span5, chev);

    li.appendChild(dep1);

    //   dep2
    // 섭취량 타이틀
    const eatTitle = document.createElement("h4");
    eatTitle.textContent = "섭취량";

    //   form영역 설정
    const inputForm = document.createElement("form");
    inputForm.setAttribute("id", "inputData");
    inputForm.setAttribute("data-CD", v.cd);
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("value", "1.0");
    const calculBtn = document.createElement("button");
    calculBtn.textContent = "확인";
    inputForm.append(input, calculBtn);
    dep2.append(eatTitle, inputForm);

    //  확인 버튼 클릭 시 1인분:입력값 계산하여 출력
    calculBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const value = input.value;
      const inputSpan2 = document.createElement("span");
      const inputSpan3 = document.createElement("span");
      const inputSpan4 = document.createElement("span");
      const inputSpan5 = document.createElement("span");

      const inputReset = document.querySelectorAll(".dep2 .print_data");
      inputReset.forEach((v, i) => {
        v.innerHTML = "";
      });

      // 열량
      inputSpan2.setAttribute("class", "print_data");
      inputSpan2.textContent = "열량(kcal)";
      const inputCal = document.createElement("span");
      inputCal.textContent = (v.cal * value).toFixed(2);
      inputSpan2.appendChild(inputCal);

      //   탄수화물
      inputSpan3.setAttribute("class", "print_data");
      inputSpan3.textContent = "탄수화물(g)";
      const inputCar = document.createElement("span");
      inputCar.textContent = (v.car * value).toFixed(2);
      inputSpan3.appendChild(inputCar);

      //   단백질
      inputSpan4.setAttribute("class", "print_data");
      inputSpan4.textContent = "단백질(g)";
      const inputPro = document.createElement("span");
      inputPro.textContent = (v.pro * value).toFixed(2);
      inputSpan4.appendChild(inputPro);

      //   지방
      inputSpan5.setAttribute("class", "print_data");
      inputSpan5.textContent = "지방(g)";
      const inputFat = document.createElement("span");
      inputFat.textContent = (v.fat * value).toFixed(2);
      inputSpan5.appendChild(inputFat);

      const save = document.createElement("button");
      let saveDt = {};
      save.textContent = "저장";
      save.setAttribute("class", "save");
      save.addEventListener("click", () => {
        saveDt.cal = parseInt(inputCal.textContent);
        saveDt.car = parseInt(inputCar.textContent);
        saveDt.pro = parseInt(inputPro.textContent);
        saveDt.fat = parseInt(inputFat.textContent);

        totalDt.cal += saveDt.cal;
        totalDt.car += saveDt.car;
        totalDt.pro += saveDt.pro;
        totalDt.fat += saveDt.fat;

        // 누적정보 출력 기능 호출
        addData();
      });

      dep2.append(inputSpan2, inputSpan3, inputSpan4, inputSpan5, save);
    });

    li.append(dep1, dep2);
    list.appendChild(li);
  });
  // 식품 이름 클릭시 height 조정, chev 회전 이벤트
  document.querySelectorAll(".food_name").forEach((v, i) => {
    v.addEventListener("click", (e) => {
      console.log(e.currentTarget.parentNode);
    });
  });
}

// 누적정보 출력
function addData() {
  // 기능 실행시 기존 숫자 삭제
  document.querySelectorAll("#footer .print_data span").forEach((v, i) => {
    v.innerHTML = "";
  });
  // 총 칼로리
  const totalCal = document.createElement("span");
  totalCal.textContent = totalDt.cal;
  document.querySelector(".data1").appendChild(totalCal);

  // 총 탄수화물
  const totalCar = document.createElement("span");
  totalCar.textContent = totalDt.car;
  document.querySelector(".data2").appendChild(totalCar);

  // 총 단백질
  const totalPro = document.createElement("span");
  totalPro.textContent = totalDt.pro;
  document.querySelector(".data3").appendChild(totalPro);

  // 총 지방
  const totalFat = document.createElement("span");
  totalFat.textContent = totalDt.fat;
  document.querySelector(".data4").appendChild(totalFat);
}

// 검색 버튼 클릭 이벤트
document.querySelector("#searchBox").addEventListener("submit", (e) => {
  e.preventDefault();

  const queryField = document.querySelector("#query");
  query = queryField.value.trim();

  if (!query) {
    alert("검색어를 입력하세요.");
    queryField.focus();
    return;
  }

  //   Ajax연결하여 json 데이터 GET
  getData();
});

document.querySelector("#delete").addEventListener("click", () => {
  totalDt = { cal: 0, car: 0, pro: 0, fat: 0 };
  document.querySelectorAll("#footer .print_data span").forEach((v, i) => {
    v.innerHTML = "";
  });
});
