import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import qr from 'qr-image';

const config = {
    api: {
        bodyParser: false, // Disable automatic body parsing, handled by formidable
    },
};

export async function POST(request: NextRequest) {
    console.log("0")
    try {
        console.log("1")
        const form = new formidable.IncomingForm();
        form.upload = './public'; // Upload directory
        form.keepExtensions = true; // Keep file extension
        console.log("2")

        // Using Promise to handle response asynchronously
        const response = await new Promise((resolve, reject) => {
            form.parse(request, async (err:any, fields:any, files:any) => {
                if (err) {
                    console.error('Error parsing form:', err);
                    reject({ error: 'Internal server error 1' });
                    return;
                }

                const { qrImage } = files;

                if (!qrImage || qrImage.type !== 'image/png') {
                    reject({ error: 'Invalid file format. Please upload a PNG image.' });
                    return;
                }

                try {
                    const imagePath = qrImage.path;
                    const qrDecoded = await scanQR(imagePath);

                    // Clean up uploaded file
                    fs.unlinkSync(imagePath);

                    resolve(
                        NextResponse.json({
                            message: 'Generate Successful',
                            success: true,
                            qrText: qrDecoded,
                        })
                    );
                } catch (error) {
                    console.error('Error processing QR code:', error);
                    reject({ error: 'Internal server error 2' });
                }
            });
        });

        return response;
    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Helper function to scan QR code
function scanQR(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const buffer = fs.readFileSync(imagePath);
            const qrImg = qr.decode(buffer.toString('base64'), { type: 'png' });
            resolve(qrImg.data);
        } catch (error) {
            reject(error);
        }
    });
}
