import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Collections } from './config/homepage';
import { ChainId, CollectionAddresses } from './config/homepage';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  // index 0 is the first / at index 1 we got collection name
  const splittedPath = request.nextUrl.pathname.split('/')
  const collectionName = splittedPath[1] as Collections;
  const collectionAddress = CollectionAddresses[collectionName];
  if (undefined === collectionAddress) {
    return NextResponse.next()
  }
  const address = collectionAddress[ChainId.SN_MAIN];

  return NextResponse.rewrite(request.nextUrl.origin + '/token/' + address + '/' + splittedPath[2])
}
