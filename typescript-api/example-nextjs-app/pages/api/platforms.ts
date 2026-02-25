/**
 * Next.js API Route - Get Platforms
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { platformService } from '../../lib/platformService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  const platforms = platformService.getAllPlatforms();

  return res.status(200).json({
    success: true,
    data: {
      platforms,
      count: platforms.length,
    },
  });
}
