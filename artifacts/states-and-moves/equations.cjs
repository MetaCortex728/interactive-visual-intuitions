const math=body=>'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">'+body+'</math>';
const words=t=>'<mtext>'+t+'</mtext>';
module.exports=[
  {tex:'\\text{outcomes}=\\frac{N!}{n_1!\\times n_2!\\times\\cdots\\times n_k!}',html:math('<mrow>'+words('outcomes')+'<mo>=</mo><mfrac><mrow><mi>N</mi><mo>!</mo></mrow><mrow><msub><mi>n</mi><mn>1</mn></msub><mo>!</mo><mo>&#xD7;</mo><msub><mi>n</mi><mn>2</mn></msub><mo>!</mo><mo>&#xD7;</mo><mo>&#x22EF;</mo><mo>&#xD7;</mo><msub><mi>n</mi><mi>k</mi></msub><mo>!</mo></mrow></mfrac></mrow>')},
  {tex:'\\text{loop length}=\\frac{n}{\\gcd(n,k)}',html:math('<mrow>'+words('loop length')+'<mo>=</mo><mfrac><mi>n</mi><mrow><mi>gcd</mi><mo>(</mo><mi>n</mi><mo>,</mo><mi>k</mi><mo>)</mo></mrow></mfrac></mrow>')},
  {tex:'rrr=ss=\\text{do nothing},\\qquad srs=rr',html:math('<mrow><mi>r</mi><mi>r</mi><mi>r</mi><mo>=</mo><mi>s</mi><mi>s</mi><mo>=</mo>'+words('do nothing')+'<mo>,</mo><mspace width="1em"/><mi>s</mi><mi>r</mi><mi>s</mi><mo>=</mo><mi>r</mi><mi>r</mi></mrow>')},
  {tex:'\\text{distance}(x,y)=\\text{fewest moves from }x\\text{ to }y',html:math('<mrow>'+words('distance')+'<mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>)</mo><mo>=</mo>'+words('fewest moves from&#xA0;')+'<mi>x</mi>'+words('&#xA0;to&#xA0;')+'<mi>y</mi></mrow>')},
  {tex:'\\text{inversions after a legal move}\\equiv\\text{inversions before}\\pmod 2',html:math('<mrow>'+words('inversions after a legal move')+'<mo>&#x2261;</mo>'+words('inversions before')+'<mspace width="0.3em"/>'+words('(mod 2)')+'</mrow>')},
  {tex:'\\text{total after a step}=\\text{total before}=1',html:math('<mrow>'+words('total after a step')+'<mo>=</mo>'+words('total before')+'<mo>=</mo><mn>1</mn></mrow>')}
];
