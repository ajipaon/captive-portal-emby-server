import Error from 'next/error';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        // Validasi input
        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        const api_key = process.env.NEXT_TOKEN_EMBY as string || '08e470d0535045818292772381e2e029';
        const user_template = process.env.NEXT_USER_TEMPLATE_FREE_EMBY as string;
        console.log(user_template);

    const response = await fetch(`http://localhost:8096/emby/Users/New?api_key=${api_key}`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Name: username,
            CopyFromUserId: user_template,
            UserCopyOptions: [
              'UserPolicy',
              'UserConfiguration'
            ]
        }),
    });

    const result = await response.json();
    if(result.Id) {
         await fetch(`http://localhost:8096/emby/Users/${result.Id}/Password?api_key=${api_key}` , {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: result.Id,
                NewPw: password,
                ResetPassword: false
            }),
        });
    
    }else{
        return NextResponse.json({ error: 'gagal membuat user' }, { status: 400 });
    }

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to register user' }, { status: response.status });
    }
        return NextResponse.json({ message: 'User registered successfully' }, { status: 200 });
        
    } catch(err: unknown) {
        if (err instanceof Error) {
            console.error((err as Error)?.message);
        } else {
            console.error('An unknown error occurred');
        }
        
        console.error(err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export function OPTIONS() {
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    return new NextResponse(null, {
        status: 204, // No Content, untuk OPTIONS
        headers,
    });
}
