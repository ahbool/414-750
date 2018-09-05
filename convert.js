const fs = require('fs')
const path = require('path')

const extnameAry = ['.css', '.js', '.html', '.jsx', '.vue', '.scss', '.sass', '.less', '.asp', '.jsp', '.php', '.tmp', '.tmpl']


class Convert {
    constructor() {
        this._rate = 750/414

        this._backupDir = '__backup'

        this.data = {
            "folders": [],
            "files": []
        }
    }

    start(dir) {
        if(fs.existsSync(this._backupDir)){
            let sep = path.sep
            let currentPath = process.cwd()

            console.log(`项目【${currentPath.split(sep).pop()}】已经转换过,无需再次转换！`)
            return
        }

        console.log('======开始转换！')

        this.getFileList(dir)
        this.createdBackupFolder()
        this.convertFile()

        console.log('======转换完成！')
    }

    getFileList(dir) {
        let fileList = []
        let folderList = []

        let walk = (_path) => {
            let files = fs.readdirSync(_path)

            files.forEach((item) => {
                let tmpPath = _path + '/' + item
                let stats = fs.statSync(tmpPath)

                if (stats.isDirectory()) {
                    folderList.push(tmpPath)
                    walk(tmpPath)

                } else {
                    let ext = path.extname(tmpPath)

                    if(extnameAry.includes(ext)){
                        fileList.push(tmpPath)
                    }
                }
            })
        }

        walk(dir)

        this.data.files = fileList
        this.data.folders = folderList
    }

    createdBackupFolder() {
        let mkdirsSync = (dirname) => {
            if(fs.existsSync(dirname)){
                return true
            } else {
                if(mkdirsSync(path.dirname(dirname))){
                    fs.mkdirSync(dirname)
                    return true
                }
            }
        }

        this.data.folders.forEach((dPath) => {
            mkdirsSync(path.resolve(this._backupDir, dPath))
        })
    }

    convertFile() {
        let self = this

        this.data.files.forEach((fpath) => {
            fs.readFile(fpath, 'utf8', (err, txt) => {
                if(err) {
                    console.log(`文件读取失败:${fpath}`)
                } else {
                    if(txt.indexOf('rem') > -1){
                        fs.copyFileSync(fpath, path.resolve(self._backupDir, fpath))

                        let txtOf750 = self.replaceRem(txt)

                        fs.writeFile(fpath, txtOf750, (err) => {
                            err && console.log(`文件写入失败:${fpath}`)
                        })
                    }
                }
            })
        })
    }

    replaceRem(fileContent) {
        let self = this

        return fileContent.replace(/(\d+)?\.?\d+rem/g, (match) => {
            match = match.replace('rem', '')
            match = Number((Number(match) * self._rate).toFixed(5))
            match = match.toString().replace('0.', '.')
            return match + 'rem'
        });
    }
}

module.exports = Convert