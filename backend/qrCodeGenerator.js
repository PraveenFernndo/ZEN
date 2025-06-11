import qr from 'qrcode';

export async function qrCode(name) {

    var qrName = "qrCodes/"+name+".png";

    await qr.toFile(qrName, qrName, function (err, url) {
        if (err) {
            console.log(err);
        }
    });


    return qrName;




}


