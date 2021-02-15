var tbody = document.querySelector("#table tbody");
var dataset = [];
var 중단플래그 = false;
var 열은칸 = 0;
var 코드표 = {
  연칸: -1,
  물음표: -2,
  깃발: -3,
  깃발지뢰: -4,
  물음표지뢰: -5,
  지뢰: 1,
  보통칸: 0,
};
//queryselector권장
//변수는 자신을 감싸고 있는 함수 바깥으로 빠져나갈
document.querySelector("#exec").addEventListener("click", function () {
  //내부 초기화
  tbody.innerHTML = "";
  중단플래그 = false;
  document.querySelector("#result").textContent = "";
  dataset = [];
  열은칸 = 코드표.보통칸;
  //hor 가로 , ver 세로 , mine 지뢰
  var hor = parseInt(document.querySelector("#hor").value);
  var ver = parseInt(document.querySelector("#ver").value);
  var mine = parseInt(document.querySelector("#mine").value);

  //지뢰 위치 뽑기
  //가로 * 세로 => 칸의 갯수
  var 후보군 = Array(hor * ver)
    .fill()
    .map(function (요소, 인덱스) {
      return 인덱스;
    });

  var 셔플 = [];

  //while (후보군.length > hor * ver - mine) {}
  for (var i = 0; i < mine; i += 1) {
    var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
    셔플.push(이동값);
  }

  //지뢰 테이블 만들기
  for (var i = 0; i < ver; i += 1) {
    var arr = [];
    var tr = document.createElement("tr");
    dataset.push(arr);

    for (var j = 0; j < hor; j += 1) {
      arr.push(코드표.보통칸);
      var td = document.createElement("td");
      //마우스 오른쪽이벤트는 contextmenu입니다.
      td.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        // return으로 함수의 실행을 중간에 끊을 수 있다.
        if (중단플래그) {
          return;
        }
        var 부모tr = e.currentTarget.parentNode;
        var 부모tbody = e.currentTarget.parentNode.parentNode;
        //나자신이 몇번째에 들어있는지를 알아내기 위해서
        //children은 유사배열이여서 Array.prototype.indexOf.call를 사용해야한다.
        var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
        var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
        if (
          e.currentTarget.textContent === "" ||
          e.currentTarget.textContent === "X"
        ) {
          e.currentTarget.textContent = "!";
          e.currentTarget.classList.add("flag");
          if (dataset[줄][칸] === 코드표.지뢰) {
            dataset[줄][칸] = 코드표.깃발지뢰;
          } else {
            dataset[줄][칸] = 코드표.깃발;
          }
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
          e.currentTarget.classList.remove("flag");
          e.currentTarget.classList.add("question");
          if (dataset[줄][칸] === 코드표.깃발지뢰) {
            dataset[줄][칸] = 코드표.물음표지뢰;
          } else {
            dataset[줄][칸] = 코드표.물음표;
          }
        } else if (e.currentTarget.textContent === "?") {
          e.currentTarget.classList.remove("question");
          if (dataset[줄][칸] === 코드표.물음표지뢰) {
            e.currentTarget.textContent = "X";
            dataset[줄][칸] = 코드표.지뢰;
          } else {
            e.currentTarget.textContent = "";
            dataset[줄][칸] = 코드표.보통칸;
          }
        }
      }); //contextMenu
      td.addEventListener("click", function (e) {
        // return으로 함수의 실행을 중간에 끊을 수 있다.
        if (중단플래그) {
          return;
        }
        var 부모tr = e.currentTarget.parentNode;
        var 부모tbody = e.currentTarget.parentNode.parentNode;
        var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
        var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
        //내칸을 클릭했을때 return 열려있는데 또 할 필요없어서
        // OR가 많아질 경우 includes를 쓴다.
        if (
          [
            코드표.연칸,
            코드표.깃발,
            코드표.깃발지뢰,
            코드표.물음표지뢰,
            코드표.물음표,
          ].includes(dataset[줄][칸])
        ) {
          return;
        }

        //클릭했을때 주변 지뢰 개수
        /**
          태그 classList로 태그의 클래스에 접근, add나 remove로 추가 삭제
          == $(this).addClass("opened"); 
         */

        //클릭했을때
        e.currentTarget.classList.add("opened");
        열은칸 += 1;
        if (dataset[줄][칸] === 코드표.지뢰) {
          e.currentTarget.textContent = "펑";
          document.querySelector("#result").textContent = "실패 ㅠㅠ";
          중단플래그 = true;
        } else {
          //주변지뢰

          var 주변 = [dataset[줄][칸 - 1], dataset[줄][칸 + 1]];
          if (dataset[줄 - 1]) {
            //concat은 배열과 배열을 합쳐서 "새로운" 배열을 만들어요
            //concat은 새로운 배열을 만들고 다시 주변에 넣어야 한다.
            주변 = 주변.concat([
              dataset[줄 - 1][칸 - 1],
              dataset[줄 - 1][칸],
              dataset[줄 - 1][칸 + 1],
            ]);
          }
          if (dataset[줄 + 1]) {
            주변 = 주변.concat([
              dataset[줄 + 1][칸 - 1],
              dataset[줄 + 1][칸],
              dataset[줄 + 1][칸 + 1],
            ]);
          }
          //filter함수
          var 주변지뢰개수 = 주변.filter(function (i) {
            return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(
              i
            );
          }).length; //숫자

          //조건문같은 것에서 거짓인 값 '',0,NaN, null, undefined, false
          e.currentTarget.textContent = 주변지뢰개수 || "";
          dataset[줄][칸] = 코드표.연칸;
          if (주변지뢰개수 === 0) {
            //주변 8칸 동시 오픈 (재귀 함수)
            //주변지뢰개수를 찾는 것처럼 주변칸을 배열로 모으는 코드
            //재귀 형식으로 코딩할 때는 효율성을 체크해야 합니다.
            var 주변칸 = [];
            if (tbody.children[줄 - 1]) {
              주변칸 = 주변칸.concat([
                tbody.children[줄 - 1].children[칸 - 1],
                tbody.children[줄 - 1].children[칸],
                tbody.children[줄 - 1].children[칸 + 1],
              ]);
            }
            주변칸 = 주변칸.concat([
              tbody.children[줄].children[칸 - 1],
              tbody.children[줄].children[칸 + 1],
            ]);
            if (tbody.children[줄 + 1]) {
              주변칸 = 주변칸.concat([
                tbody.children[줄 + 1].children[칸 - 1],
                tbody.children[줄 + 1].children[칸],
                tbody.children[줄 + 1].children[칸 + 1],
              ]);
            }
            //주변에서 undefined,null,0,빈문자열을 제거하는 코드
            //주변칸.filter((v) => !!v).forEach;

            주변칸
              .filter(function (v) {
                return !!v;
              })
              .forEach(function (옆칸) {
                var 부모tr = 옆칸.parentNode;
                var 부모tbody = 옆칸.parentNode.parentNode;
                var 옆칸칸 = Array.prototype.indexOf.call(
                  부모tr.children,
                  옆칸
                );
                var 옆칸줄 = Array.prototype.indexOf.call(
                  부모tbody.children,
                  부모tr
                );
                if (dataset[옆칸줄][옆칸칸] !== 코드표.연칸) {
                  옆칸.click();
                }
              });
          }
          //칸 수에다가 지뢰갯수 빼면 80개
          if (열은칸 === hor * ver - mine) {
            중단플래그 = true;
            document.querySelector("#result").textContent = "승리 ㅅㅅ";
          }
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  //지뢰 심기
  for (var k = 0; k < 셔플.length; k++) {
    // 예 59
    // 59
    //배열은 index가 -1이 나오면 안됀다.

    var 가로 = Math.floor(셔플[k] / ver); //예 6 -> 5
    var 세로 = 셔플[k] % ver; // 예 9-> 8
    tbody.children[세로].children[가로].textContent = "X";
    dataset[세로][가로] = 코드표.지뢰;
  }
});
/**
e.currentTarget();
e.target();
*/
/**
 스코프 간의 상하관계를 스코프 체인
 var name = 'zero';
 var enemy;
 function outer() {
   console.log('외부',name); //외부 zero
   function inner(){
     var enemy = 'nero';
     console.log('내부',name); //내부 zero
   }
   inner();
 }
 outer();
 console.log(enemy);
 */
/**
   렉시컬 스코핑
   코드가 적힌 순간 스코프가 정해져요 이것을 렉시컬 스코프라고 불러요 
   var name = 'zero'; // -> nero
   function log() {
     console.log(name); // -> nero
   }
   function wrapper(){
     var name = '비밀번호(제로초바보)';
     log();
   }
   wrapper();
*/
/**
 클로저
 어떠한 관계 어휘적 환경 -> 정적 환경 
 함수와 함수가 접근할 수 있는 스코프가 클로저 관계를 맺는다. 
 클로저 문제 : 반복문과 비동기 함수가 만날 때 클로저 문제가 자주 발생합니다. 

setTimeout과 for이 만나면 반복문이 잘 안됀다. 
함수 안의 변수는 "실행"될 때 값이 결정됩니다.
비동기들은 순서대로 실행 

 for(var i=0; i<100 ; i++){
   setTimeout(function(){
     console.log(i);
   }, i*1000 );
 }
  |
 \ / 
  V
setTimeout(function(){
  console.log(i); // 100
},0 * 1000); // 0초 

setTimeout(function(){
  console.log(i); // 100
},1 * 1000); // 1초뒤에 i를 찾는거 

setTimeout(function(){
  console.log(i);
},2 * 1000);
 */

/**
  클로저 문제를 해결할수 있는 해결책 클로저의 특성을 찾아서 해결 
  for(var i=0; i< 100; i++){
    function 클로저(j){
      setTimeout(function(i){
        console.log(j);
      }; j * 1000);
    }
    클로저(i);
  }

  function 클로저(j){ // j가 0
    setTimeout(function(){
     console.log(j); // 0
    }, j*1000);
  }
  클로저(0);

  function 클로저(j){ // j가 1
    setTimeout(function(){
     console.log(j) // 1
    }, j*1000);
  }
  클로저(1);

  function 클로저(j){ //j가 2
    setTimeout(function(){
     console.log(j) //2
    }, j*1000);
  }
  클로저(2);

  
  for(var i = 0; i<당첨숫자들.length;i++){
    function 클로저(j){
      setTimeout(function(){
        공색칠하기(당첨숫자들[j],결과창);
      },(j+1)*1000);
    }
    클로저(i);
  }

  for(var i = 0; i<당첨숫자들.length;i++){
    (function 클로저(j){
      setTimeout(function(){
        공색칠하기(당첨숫자들[j],결과창);
      },(j+1)*1000);
    })(i);
  }

  //재귀함수 예
  function 



  */
