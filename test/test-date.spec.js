/**
 * == @Spearal ==>
 * 
 * Copyright (C) 2014 Franck WOLFF & William DRAI (http://www.spearal.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Franck WOLFF
 */
describe('Spearal Date Coding', function() {
	
	var factory = new SpearalFactory();
	
	function encodeDecode(value, expectedSize) {
		var encoder = factory.newEncoder();
		encoder.writeAny(value);

		var buffer = encoder.buffer;
		if (expectedSize)
			expect(buffer.byteLength).toEqual(expectedSize);
		
		var copy = factory.newDecoder(buffer).readAny();
		expect(copy === null || copy instanceof Date).toBeTruthy();
		
		if (Number.isNaN(value.getTime()))
			expect(copy).toBeNull();
		else
			expect(copy).toEqual(value);
	}
	
	it('Test some Date', function() {
		encodeDecode(new Date());
		encodeDecode(new Date(0));
		encodeDecode(new Date(Number.NaN));
		encodeDecode(new Date(0x7fffffffffffffff));
	});
});