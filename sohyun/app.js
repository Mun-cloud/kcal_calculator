document.querySelector('#query').addEventListener('submit', e => {
    e.preventDefault();

    console.log(e);
    const inputData = document.querySelector('#input_id');
    console.log(inputData.value);

    const xhr = new XMLHttpRequest();
    const method = "GET";

    var url = "http://openapi.foodsafetykorea.go.kr/api/d0ea543ac4184c0ab6fe/I2790/json/1/2/DESC_KOR=";


    if(inputData.value != "") {
        url = url + inputData.value;
    } else {
        url = "http://openapi.foodsafetykorea.go.kr/api/d0ea543ac4184c0ab6fe/I2790/json/1/2";
    }

    xhr.onreadystatechange = e => {
        const {target} = e;
        console.log("tttt22");
        
        switch (target.readyState) {
            case XMLHttpRequest.OPENED:
                console.log("xhr 초기화");
                break;
            case XMLHttpRequest.HEADERS_RECEIVED:
                console.log("send 호출");
                break;
            case XMLHttpRequest.LOADING:
                console.log("수신중");
                break;
            case XMLHttpRequest.DONE:
                console.log("통신종료");

                console.log(target);

                if(target.status == 200) {
                    console.log("text: %s", target.statusText);

                    const res = target.response;

                    console.log(res);

                    var obj = JSON.parse(res);

                    console.log("obj");
                    console.log(obj);
                    console.log(obj.I2790.row[0].DESC_KOR);

                    

                    document.getElementById("foodName").innerHTML = obj.I2790.row[0].DESC_KOR;
                    document.getElementById("person1").innerHTML = obj.I2790.row[0].SERVING_SIZE;
                    document.getElementById("NUTR_CONT1").innerHTML = obj.I2790.row[0].NUTR_CONT1;
                    document.getElementById("NUTR_CONT2").innerHTML = obj.I2790.row[0].NUTR_CONT2;
                    document.getElementById("NUTR_CONT3").innerHTML = obj.I2790.row[0].NUTR_CONT3;
                    document.getElementById("NUTR_CONT4").innerHTML = obj.I2790.row[0].NUTR_CONT4;


                } else {
                    const s = parseInt(target.status / 100);
                    if(s == 4) {
                        console.log("400 error");
                    } else if(s == 5) {
                        console.log("500 error");
                    } else {
                        console.log("error");
                    }
                }
                break;
        }
    }

    xhr.open(method, url);
    xhr.send();
})