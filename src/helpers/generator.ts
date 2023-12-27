export function generateInitialFromName(text: string) {
  if (!text) return;
  const exp = text.split(' ');
  if (exp.length === 1) {
    return exp[0][0] + exp[0][1];
  } else if (exp.length > 1) {
    return exp[0][0] + exp[1][0];
  } else {
    return 'SK';
  }
}
const generateSubdomain = (officeName: string)=>{
  let result = officeName.toLowerCase();
  result = result.replace(/[\W_]+/g,"-");
  return result;
}
export {
  generateSubdomain
}