/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2011 Paolo Vergori, ISMB (IT)
 *******************************************************************************/


var transCoding = require('./transCoding.js');

var obj = new transCoding.transcodingObj();

obj.sourcePath.setValue('/home/paolo/Desktop/gstExamples/public/brave.mov');
obj.outputVideoCodec.setValue('xvid');
obj.outputAudioCodec.setValue('mp3');
obj.outputContainer.setValue('avi');
obj.destPath.setValue('/home/paolo/');
obj.transcode();

