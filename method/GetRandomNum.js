const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
// 生成 长度为 18 的混淆字符串方法
const GetRandomNum = () => {
	let res = "";
	for(let i = 0; i < 18 ; i ++) {
		let id = Math.ceil(Math.random()*61);
		res += chars[id];
	}
	return res;
}


module.exports = GetRandomNum