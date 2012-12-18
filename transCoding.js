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

var child = require('child_process');

var VideoCodecs = ['h264', 'xvid'];
var AudioCodecs = ['mp3', 'aac'];
var Containers = ['mp4', 'avi', 'mov'];


var transcodingObj = function(){
    this.sourcePath = new _sourcePath();
    this.destPath = new _destPath();
    this.outputVideoCodec = new _outputVideoCodec();
    this.outputAudioCodec = new _outputAudioCodec();
    this.outputContainer = new _outputContainer();
};
transcodingObj.prototype.sourcePath;
transcodingObj.prototype.destPath;
transcodingObj.prototype.outputVideoCodec;
transcodingObj.prototype.outputAudioCodec;
transcodingObj.prototype.outputContainer;

var _sourcePath = function(){
    var value;
    this.getValue = function(){
        return value;
    };
    this.setValue = function(val){
        value = val;
    };        
};
var _destPath = function(){
    var value;
    this.getValue = function(){
        return value;
    };
    this.setValue = function(val){
        value = val;
    };        
};

var _outputVideoCodec = function(){
    var value;
    this.getValue = function(){
        return value;
    };    
    this.setValue = function(val){
        switch (val)
        {
            case VideoCodecs[0]:
                value = "x264enc";
            break;
            case VideoCodecs[1]:
                value = "xvidenc";
            break;
            default:
                onSpawnError("Error: " + val + " is not supported.\n");
                return 1;
        }
    };        
};

var _outputAudioCodec = function(){
    var value;
    this.getValue = function(){
        return value;
    };    
    this.setValue = function(val){
        switch (val)
        {
            case AudioCodecs[0]:
                value = "lamemp3enc";
                break;
            case AudioCodecs[1]:
                value = "ffenc_aac";
                break;
            default:
                onSpawnError("Error: " + val + " is not supported.\n");
                return 1;
        }
    };        
};

var _outputContainer = function(){
    var value;
    this.getValue = function(){
        return value;
    };    
    this.setValue = function(val){
        switch (val)
        {
            case Containers[0]:
                value = "qtmux";
            break;
            case Containers[1]:
                value = "avimux";
            break;
            case Containers[2]:
                value = "qtmux";
            break;
            default:
                onSpawnError("Error: " + val + " is not supported.\n");
                return 1;
        }
    };
};

transcodingObj.prototype.transcode = function(){
    
    if(this.sourcePath.getValue() === undefined ||
            this.destPath.getValue() === undefined ||
            this.outputVideoCodec.getValue() === undefined ||
            this.outputAudioCodec.getValue() === undefined ||
            this.outputContainer.getValue() === undefined){
        
        onSpawnError("Error: missing argument!\n");
        return 1;
    }
    
    var cmd = 'gst-launch';
    var args = '';
    var options = null;   
    
    args =
    ['filesrc', 'location=' + this.sourcePath.getValue(),
    '!', 'decodebin2', 'name=demux',
    '{ demux.', '!', 'queue',
    '!', this.outputVideoCodec.getValue(),
    '!', 'mux. }',
    '{ demux.', '!', 'queue',
    '!', this.outputAudioCodec.getValue(),
    '!', 'mux. }',
    this.outputContainer.getValue(), 'name=mux',
    '!', 'filesink', 'location=' + this.destPath.getValue() + this.sourcePath.getValue().substring(this.sourcePath.getValue().lastIndexOf('/')+1, this.sourcePath.getValue().lastIndexOf('.')) + '.transcoded'
    ];
               
    var gstMuxer = child.spawn(cmd, args, options);    
    gstMuxer.stdout.on('data', function(chunk){console.log(chunk);});
    gstMuxer.stderr.on('data', onSpawnError);
    gstMuxer.on('exit', onSpawnExit);
};



function onSpawnError(data) {
    console.log(data.toString());
}

function onSpawnExit(code) {
    if (code != null) {
        console.error('GStreamer error, exit code ' + code);
    }
}



exports.transcodingObj = transcodingObj;
