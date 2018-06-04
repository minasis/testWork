
var params = {
	"title":"T map X NUGU 2018 새해 나의 운세는?",
	"thumb":"http://event.tmap.co.kr/comm/astro_2018/images/thumb.png",
	"targetUrl":"http://event.tmap.co.kr/comm/astro_2018/index.html",
	"description":"2018년 신년 운세 T map x NUGU로 지금 확인하세요",
	"shortUrl":"https://goo.gl/iahxeZ"
}

$(function(){
	var now = new Date();
	var targetDate = new Date(2018,0,1);

    console.log(targetDate)
	if(now.getTime() >= targetDate.getTime()){		
        var target = $(".top img").eq(0)
        console.log("test")
		target.attr("src", String(target.attr("src")).replace("01_1", "01_2"));
	}

	delete targetDate;
	delete now;
	
	$(".tryBtn a").click(function(){
		$(".popupWrap").show();
		$(".popup").css("margin-top", function(){
			return ($(".popup").outerHeight() / -2) + "px"
		})
	});

	$(".popup .popClose").click(function(){
		$(".popupWrap").hide();
	});

	if(deviceCheck() == "ios"){
		var target = $(".popup img")
		target.attr("src", String(target.attr("src")).replace("andImg", "iosImg"));
	}

	

	snsLinksSet(params);
});

function deviceCheck(){
    var userAgent = navigator.userAgent.toLocaleLowerCase();
    var andro = userAgent.search("android") > -1;
    var iphone = userAgent.search("iphone") > -1;
    var ipod = userAgent.search("ipod") > -1;
    var ipad = userAgent.search("ipad") > -1;

    if(andro){
        return "andro";
    }else if(iphone || ipod || ipad){
        return "ios";
    }else{
        return "none"
    }
}

function snsLinksSet(params){
    // 사용할 앱의 Javascript 키를 설정해 주세요.
    Kakao.init('6b276e901458bf6a75cee6b3fea8ee82');

    // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
    Kakao.Link.createTalkLinkButton({
      container: '.kakao',
      label: params.description,
      image: {
        src: params.thumb,
        width: '300',
        height: '300'
      },
      webButton: {
        text: '자세히 보기',
        url: params.targetUrl // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
      }
    });

    $(".facebook").attr("href", "http://www.facebook.com/share.php?u=" + params.targetUrl + "&t=" + params.description);
    $(".line").attr("href", "http://line.me/R/msg/text/" + params.targetUrl);

    var smsHeader = ""
    switch(deviceCheck()){
        case "andro":            
            smsHeader = "sms:?body="
            break;
        case "ios":
            smsHeader = "sms:&body="
            break;
        case "none":
            smsHeader = "sms:?body="
            break;
    } 
    $(".sms").attr("href", smsHeader + params.description + " " + params.shortUrl)
}